import { Exam } from '@core/exam/domain/entities/exam.entity';
import { IExamRepository } from '@core/exam/domain/repositories/exam.repository';
import { ExamStatus } from '@core/exam/enums/exam-status.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Exam as PrismaExam } from '@prisma/client';

import { parseEnum } from '@common/utils/functions/string-enum';

@Injectable()
export class ExamPrismaMapper {
	examStatusMap(from: string): ExamStatus {
		return parseEnum(ExamStatus, from);
	}

	toDomain(from: ExtendedExam): Exam {
		return new Exam({
			...from,
			sections: from.sections.map(s => ({ id: s.id, order: s.order })),
			status: this.examStatusMap(from.status),
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
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
		private readonly mapper: ExamPrismaMapper,
	) {}

	async findOne(id: string): Promise<Exam | null> {
		const foundExam = await this.txHost.tx.exam.findUnique({
			where: { id },
			include: examPrismaIncludeObj,
		});
		return foundExam ? this.mapper.toDomain(foundExam) : null;
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
