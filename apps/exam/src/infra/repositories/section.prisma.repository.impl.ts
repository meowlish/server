import { Section, SectionChildrenRef } from '../../domain/entities/section.entity';
import { ISectionRepository } from '../../domain/repositories/section.repository';
import { SectionType } from '../../enums/section-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Section as PrismaSection } from '@prisma-client/exam';
import { Action } from '@server/utils';
import { parseEnum } from '@server/utils';

@Injectable()
export class SectionPrismaMapper {
	mapSectionType(from: string): SectionType {
		return parseEnum(SectionType, from);
	}

	toDomain(from: ExtendedSection): Section {
		let children: SectionChildrenRef[];
		const contentType: SectionType = this.mapSectionType(from.contentType);

		if (contentType === SectionType.QUESTION) {
			children = from.questions.map(q => new SectionChildrenRef(q.id, q.order));
		} else if (contentType === SectionType.SECTION) {
			children = from.childSections.map(s => new SectionChildrenRef(s.id, s.order));
		} else children = [];

		return new Section({
			...from,
			children,
			contentType,
		});
	}

	toOrm(from: Section): RepoSection {
		return {
			contentType: from.contentType,
			directive: from.directive,
			examId: from.examId,
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

	async getExamIdOfSection(id: string): Promise<string> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			select: { examId: true },
		});
		if (!foundSection) throw new NotFoundException('Section not found.');
		return foundSection.examId;
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

	async update(section: Section): Promise<void> {
		const data = this.mapper.toOrm(section);
		const childrenToCreate: SectionChildrenRef[] = [];
		const childrenToUpdate: SectionChildrenRef[] = [];
		const idsToDelete: string[] = [];
		section.children.forEach(c => {
			switch (c.action) {
				case Action.CREATE:
					childrenToCreate.push(c);
					break;

				case Action.DELETE:
					idsToDelete.push(c.id);
					break;

				case Action.UPDATE:
					childrenToUpdate.push(c);
					break;

				default:
					return;
			}
		});
		await this.txHost.withTransaction(async () => {
			// if contentType is question
			if (section.contentType === SectionType.QUESTION) {
				if (childrenToUpdate.length)
					await this.txHost.tx.question.createMany({
						data: childrenToCreate.map(q => ({
							id: q.id,
							order: q.order,
							sectionId: section.id,
						})),
					});
				if (idsToDelete.length)
					await this.txHost.tx.question.deleteMany({ where: { id: { in: idsToDelete } } });
				for (const q of childrenToUpdate) {
					await this.txHost.tx.question.update({ where: { id: q.id }, data: q });
				}
			}
			// if contentType is section
			else if (section.contentType === SectionType.SECTION) {
				if (childrenToUpdate.length)
					await this.txHost.tx.section.createMany({
						data: childrenToCreate.map(s => ({
							id: s.id,
							order: s.order,
							sectionId: section.id,
							examId: section.examId,
						})),
					});
				if (idsToDelete.length)
					await this.txHost.tx.section.deleteMany({ where: { id: { in: idsToDelete } } });
				for (const s of childrenToUpdate) {
					await this.txHost.tx.section.update({ where: { id: s.id }, data: s });
				}
			}
			// update the main section
			await this.txHost.tx.section.update({ where: { id: section.id }, data });
		});
	}

	async delete(id: string): Promise<void> {
		await this.txHost.tx.section.delete({ where: { id } });
	}
}

// extended section type with JOINS
type ExtendedSection = Prisma.SectionGetPayload<{
	include: {
		childSections: { select: { id: true; order: true } };
		questions: { select: { id: true; order: true } };
	};
}>;

export type RepoSection = Omit<PrismaSection, 'id' | 'order'>;

const sectionPrismaIncludeObject = {
	childSections: { select: { id: true, order: true }, orderBy: { order: 'asc' } },
	questions: { select: { id: true, order: true }, orderBy: { order: 'asc' } },
} satisfies Prisma.SectionInclude;
