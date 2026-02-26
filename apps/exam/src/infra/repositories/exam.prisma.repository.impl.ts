import { Exam, ExamId, ExamSection } from '../../domain/entities/exam.entity';
import {
	SectionCreatedEvent,
	SectionDeletedEvent,
	SectionMovedEvent,
} from '../../domain/events/exam-management.event';
import { IExamRepository } from '../../domain/repositories/exam.repository';
import { ExamStatus } from '../../enums/exam-status.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Exam as PrismaExam } from '@prisma-client/exam';
import { parseEnum } from '@server/utils';
import { Event } from '@server/utils';

@Injectable()
export class ExamPrismaMapper {
	mapExamStatus(from: string): ExamStatus {
		return parseEnum(ExamStatus, from);
	}

	toDomain(from: ExtendedExam): Exam {
		return new Exam({
			...from,
			id: new ExamId(from.id, from.version),
			sections: from.sections.map(s => new ExamSection(s.id, s.order)),
			status: this.mapExamStatus(from.status),
		});
	}

	toOrm(from: Exam): RepoExam {
		return {
			createdBy: from.createdBy,
			id: from.id.id,
			version: from.id.version,
			description: from.description,
			duration: from.duration,
			status: from.status,
			title: from.title,
		};
	}
}

@Injectable()
export class ExamPrismaRepository implements IExamRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>,
		private readonly mapper: ExamPrismaMapper,
	) {}

	async findOne(id: string): Promise<Exam | null> {
		const foundExam = await this.txHost.tx.exam.findUnique({
			where: { id },
			include: examPrismaIncludeObj,
		});
		return foundExam ? this.mapper.toDomain(foundExam) : null;
	}

	async getParentExamOfSection(id: string): Promise<Exam> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			include: { exam: { include: examPrismaIncludeObj } },
		});
		if (!foundSection) throw new NotFoundException('Section not found.');
		return this.mapper.toDomain(foundSection.exam);
	}

	async save(exam: Exam): Promise<void> {
		const data = this.mapper.toOrm(exam);
		await this.txHost.withTransaction(async () => {
			// insert if lock is new version
			if (data.version === 0) await this.txHost.tx.exam.create({ data });

			// handle events
			for (const event of exam.getUncommittedEvents()) {
				await this.handle(event);
			}

			// update or insert (because of lock)
			await this.txHost.tx.exam.update({
				where: { id: data.id, version: data.version },
				data: { ...data, version: { increment: 1 } },
			});
		});
	}

	async delete(exam: Exam): Promise<void> {
		await this.txHost.tx.exam.delete({ where: { id: exam.id.id, version: exam.id.version } });
	}

	private async handle(event: Event<any>): Promise<void> {
		if (event instanceof SectionCreatedEvent) return await this.onSectionCreated(event);
		if (event instanceof SectionMovedEvent) return await this.onSectionMoved(event);
		if (event instanceof SectionDeletedEvent) return await this.onSectionDeleted(event);
	}

	private async onSectionCreated(event: SectionCreatedEvent): Promise<void> {
		await this.txHost.tx.section.create({
			data: { ...event.payload.data, examId: event.payload.examId.id },
		});
	}

	private async onSectionMoved(event: SectionMovedEvent): Promise<void> {
		await this.txHost.tx.section.update({
			where: { id: event.payload.sectionId },
			data: { ...event.payload.data, parentId: null },
		});
	}

	private async onSectionDeleted(event: SectionDeletedEvent): Promise<void> {
		await this.txHost.tx.section.delete({
			where: { id: event.payload.sectionId },
		});
	}
}

// extended exam type with JOINS
type ExtendedExam = Prisma.ExamGetPayload<{
	include: { sections: { where: { parentId: null }; select: { id: true; order: true } } };
}>;

type RepoExam = Omit<PrismaExam, 'updatedAt' | 'createdAt'>;

const examPrismaIncludeObj = {
	sections: {
		where: { parentId: null },
		select: { id: true, order: true },
		orderBy: { order: 'asc' },
	},
} satisfies Prisma.ExamInclude;
