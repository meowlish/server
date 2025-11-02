import { Section } from '@core/exam/domain/entities/section.entity';
import { ISectionRepository } from '@core/exam/domain/repositories/section.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Section as PrismaSection } from '@prisma/client';

@Injectable()
export class SectionPrismaMapper {
	toDomain(from: ExtendedSection): Section {
		return new Section({
			...from,
			children: from.childSections
				.map(s => ({ id: s.id, order: s.order }))
				.concat(from.questions.map(q => ({ id: q.id, order: q.order }))),
		});
	}

	toOrm(from: Section): RepoSection {
		return {
			directive: from.directive,
			examId: from.examId,
			name: from.name,
			order: from.order,
			parentId: from.parentId,
		};
	}
}

@Injectable()
export class SectionPrismaRepository implements ISectionRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
		private readonly mapper: SectionPrismaMapper,
	) {}

	async findOne(id: string): Promise<Section | null> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	// check again
	async findOneInTheSameExamAsSection(id: string, sectionId: string): Promise<Section | null> {
		const foundBaseSection = await this.txHost.tx.section.findFirst({
			where: {
				id: sectionId,
			},
			select: { examId: true },
		});

		if (!foundBaseSection)
			throw new NotFoundException(`Section id ${sectionId} could not be found`);

		const foundSection = await this.txHost.tx.section.findFirst({
			where: { id, examId: foundBaseSection.examId },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	// check again
	async findOneInTheSameExamAsQuestion(id: string, questionId: string): Promise<Section | null> {
		const foundQuestion = await this.txHost.tx.question.findFirst({
			where: { id: questionId },
			select: {
				section: { select: { examId: true } },
			},
		});

		if (!foundQuestion) throw new NotFoundException(`Question id ${questionId} could not be found`);

		const foundSection = await this.txHost.tx.section.findFirst({
			where: { id, examId: foundQuestion.section.examId },
			include: sectionPrismaIncludeObject,
		});
		return foundSection ? this.mapper.toDomain(foundSection) : null;
	}

	async create(section: Section): Promise<void> {
		const data = this.mapper.toOrm(section);
		await this.txHost.tx.section.create({ data });
	}

	async update(section: Section): Promise<void> {
		const data = this.mapper.toOrm(section);
		await this.txHost.tx.section.update({ where: { id: section.id }, data });
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

export type RepoSection = Omit<PrismaSection, 'id'>;

const sectionPrismaIncludeObject = {
	childSections: { select: { id: true, order: true } },
	questions: { select: { id: true, order: true } },
} satisfies Prisma.SectionInclude;
