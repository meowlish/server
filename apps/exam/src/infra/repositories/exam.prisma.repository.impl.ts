import { Exam, ExamSectionRef } from '../../domain/entities/exam.entity';
import { IExamRepository } from '../../domain/repositories/exam.repository';
import { ExamStatus } from '../../enums/exam-status.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Exam as PrismaExam } from '@prisma/client/exam';
import { parseEnum } from '@server/utils';

@Injectable()
export class ExamPrismaMapper {
	mapExamStatus(from: string): ExamStatus {
		return parseEnum(ExamStatus, from);
	}

	toDomain(from: ExtendedExam): Exam {
		return new Exam({
			...from,
			sections: from.sections.map(s => new ExamSectionRef(s.id, s.order)),
			status: this.mapExamStatus(from.status),
		});
	}

	toOrm(from: Exam): RepoExam {
		return {
			createdBy: from.createdBy,
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

	async getStatus(id: string): Promise<ExamStatus | null> {
		const foundExam = await this.txHost.tx.exam.findUnique({
			where: { id },
			select: { status: true },
		});
		return foundExam ? this.mapper.mapExamStatus(foundExam.status) : null;
	}

	async getStatusBySectionId(id: string): Promise<ExamStatus | null> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			select: { exam: { select: { status: true } } },
		});
		return foundSection ? this.mapper.mapExamStatus(foundSection.exam.status) : null;
	}

	async getStatusByQuestionId(id: string): Promise<ExamStatus | null> {
		const foundQuestion = await this.txHost.tx.question.findUnique({
			where: { id },
			select: { section: { select: { exam: { select: { status: true } } } } },
		});
		return foundQuestion ? this.mapper.mapExamStatus(foundQuestion.section.exam.status) : null;
	}

	async getParentExamOfSection(id: string): Promise<Exam> {
		const foundSection = await this.txHost.tx.section.findUnique({
			where: { id },
			include: { exam: { include: examPrismaIncludeObj } },
		});
		if (!foundSection) throw new NotFoundException('Section not found.');
		return this.mapper.toDomain(foundSection.exam);
	}

	async create(exam: Exam): Promise<void> {
		const data = this.mapper.toOrm(exam);
		await this.txHost.tx.exam.create({ data });
	}

	async update(exam: Exam): Promise<void> {
		const data = this.mapper.toOrm(exam);
		await this.txHost.tx.exam.update({ where: { id: exam.id }, data });
	}

	async delete(id: string): Promise<void> {
		await this.txHost.tx.exam.delete({ where: { id } });
	}
}

// extended exam type with JOINS
type ExtendedExam = Prisma.ExamGetPayload<{
	include: { sections: { select: { id: true; order: true } } };
}>;

type RepoExam = Omit<PrismaExam, 'id' | 'updatedAt' | 'createdAt'>;

const examPrismaIncludeObj = {
	sections: { select: { id: true, order: true } },
} satisfies Prisma.ExamInclude;
