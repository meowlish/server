import { ExamId } from '../../domain/entities/exam.entity';
import { Section, SectionChild } from '../../domain/entities/section.entity';
import {
	ChildSectionCreatedEvent,
	ChildSectionMovedEvent,
	QuestionCreatedEvent,
	QuestionDeletedEvent,
	QuestionMovedEvent,
	SectionDeletedEvent,
} from '../../domain/events/exam-management.event';
import { ISectionRepository } from '../../domain/repositories/section.repository';
import { ExamStatus } from '../../enums/exam-status.enum';
import { SectionType } from '../../enums/section-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Section as PrismaSection } from '@prisma-client/exam';
import { Question as PrismaQuestion } from '@prisma/client';
import { parseEnum } from '@server/utils';
import { Event } from '@server/utils';

@Injectable()
export class SectionPrismaMapper {
	mapExamStatus(from: string): ExamStatus {
		return parseEnum(ExamStatus, from);
	}

	mapSectionType(from: string): SectionType {
		return parseEnum(SectionType, from);
	}

	toDomain(from: ExtendedSection): Section {
		let children: SectionChild[];
		const contentType: SectionType = this.mapSectionType(from.contentType);

		// map children
		if (contentType === SectionType.QUESTION) {
			children = from.questions.map(q => new SectionChild(q.id, q.order));
		} else if (contentType === SectionType.SECTION) {
			children = from.childSections.map(s => new SectionChild(s.id, s.order));
		} else children = [];

		return new Section({
			...from,
			examId: new ExamId(from.exam.id, from.exam.version),
			examStatus: this.mapExamStatus(from.exam.status),
			children,
			contentType,
		});
	}

	toChildQuestionOrm(from: SectionChild, parentId: string): RepoChildQuestion {
		return {
			id: from.id,
			order: from.order,
			sectionId: parentId,
		};
	}

	toChildSectionOrm(from: SectionChild, parentId: string, examId: string): RepoChildSection {
		return {
			id: from.id,
			order: from.order,
			parentId: parentId,
			examId: examId,
		};
	}

	toParentSectionOrm(from: Section): RepoSection {
		return {
			id: from.id,
			contentType: from.contentType,
			directive: from.directive,
			examId: from.examId.id,
			name: from.name,
			parentId: from.parentId,
		};
	}
}

@Injectable()
export class SectionPrismaRepository implements ISectionRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>,
		private readonly mapper: SectionPrismaMapper,
	) {}

	async findOne(id: string): Promise<Section | null> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	async getParentSectionOfQuestion(id: string): Promise<Section> {
		const foundQuestion = await this.txHost.tx.question.findFirst({
			where: { id },
			include: { section: { include: sectionPrismaIncludeObject } },
		});
		if (!foundQuestion) throw new NotFoundException('Question not found.');
		return this.mapper.toDomain(foundQuestion.section);
	}

	async getParentSectionOfSection(id: string): Promise<Section | null> {
		const foundSection = await this.txHost.tx.section.findFirst({
			where: { id },
			include: { parentSection: { include: sectionPrismaIncludeObject } },
		});
		if (!foundSection) throw new NotFoundException('Section not found.');
		const foundParentSection = foundSection.parentSection;
		return foundParentSection ? this.mapper.toDomain(foundParentSection) : null;
	}

	// check again
	async findOneInTheSameExamAsSection(id: string, sectionId: string): Promise<Section | null> {
		const foundBaseSection = await this.txHost.tx.section.findUnique({
			where: {
				id: sectionId,
			},
			select: { examId: true },
		});

		if (!foundBaseSection)
			throw new NotFoundException(`Section id ${sectionId} could not be found`);

		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id, examId: foundBaseSection.examId },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	// check again
	async findOneInTheSameExamAsQuestion(id: string, questionId: string): Promise<Section | null> {
		const foundQuestion = await this.txHost.tx.question.findUnique({
			where: { id: questionId },
			select: {
				section: { select: { examId: true } },
			},
		});

		if (!foundQuestion) throw new NotFoundException(`Question id ${questionId} could not be found`);

		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id, examId: foundQuestion.section.examId },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	async save(section: Section): Promise<void> {
		const data = this.mapper.toParentSectionOrm(section);
		await this.txHost.withTransaction(async () => {
			// handle events
			for (const event of section.getUncommittedEvents()) {
				await this.handle(event);
			}

			// update the main section with lock
			await this.txHost.tx.section.update({
				where: { id: section.id, exam: { id: section.examId.id, version: section.examId.version } },
				data,
			});

			await this.txHost.tx.exam.update({
				where: { id: section.examId.id, version: section.examId.version },
				data: { version: { increment: 1 } },
			});
		});
	}

	private async handle(event: Event<any>): Promise<void> {
		if (event instanceof QuestionCreatedEvent) return await this.onQuestionCreated(event);
		if (event instanceof QuestionMovedEvent) return await this.onQuestionMoved(event);
		if (event instanceof QuestionDeletedEvent) return await this.onQuestionDeleted(event);
		if (event instanceof ChildSectionCreatedEvent) return await this.onChildSectionCreated(event);
		if (event instanceof ChildSectionMovedEvent) return await this.onChildSectionMoved(event);
		if (event instanceof SectionDeletedEvent) return await this.onSectionDeleted(event);
	}

	private async onQuestionCreated(event: QuestionCreatedEvent): Promise<void> {
		await this.txHost.tx.question.create({
			data: this.mapper.toChildQuestionOrm(event.payload.data, event.payload.sectionId),
		});
	}

	private async onQuestionMoved(event: QuestionMovedEvent): Promise<void> {
		await this.txHost.tx.question.update({
			where: { id: event.payload.questionId },
			data: this.mapper.toChildQuestionOrm(event.payload.data, event.payload.sectionId),
		});
	}

	private async onQuestionDeleted(event: QuestionDeletedEvent): Promise<void> {
		await this.txHost.tx.question.delete({
			where: { id: event.payload.questionId },
		});
	}

	private async onChildSectionCreated(event: ChildSectionCreatedEvent): Promise<void> {
		await this.txHost.tx.section.create({
			data: this.mapper.toChildSectionOrm(
				event.payload.data,
				event.payload.parentId,
				event.payload.examId.id,
			),
		});
	}

	private async onChildSectionMoved(event: ChildSectionMovedEvent): Promise<void> {
		await this.txHost.tx.section.update({
			where: { id: event.payload.sectionId },
			data: this.mapper.toChildSectionOrm(
				event.payload.data,
				event.payload.parentId,
				event.payload.examId.id,
			),
		});
	}

	private async onSectionDeleted(event: SectionDeletedEvent): Promise<void> {
		await this.txHost.tx.section.delete({
			where: { id: event.payload.sectionId },
		});
	}
}

// extended section type with JOINS
type ExtendedSection = Prisma.SectionGetPayload<{
	include: {
		childSections: { select: { id: true; order: true } };
		questions: { select: { id: true; order: true } };
		exam: { select: { id: true; version: true; status: true } };
	};
}>;

type RepoSection = Omit<PrismaSection, 'order'>;

const sectionPrismaIncludeObject = {
	childSections: { select: { id: true, order: true }, orderBy: { order: 'asc' } },
	questions: { select: { id: true, order: true }, orderBy: { order: 'asc' } },
	exam: { select: { id: true, version: true, status: true } },
} satisfies Prisma.SectionInclude;

type RepoChildSection = Pick<PrismaSection, 'id' | 'parentId' | 'examId' | 'order'>;
type RepoChildQuestion = Pick<PrismaQuestion, 'id' | 'sectionId' | 'order'>;
