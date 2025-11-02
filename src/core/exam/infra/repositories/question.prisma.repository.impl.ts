import { Answer, Question } from '@core/exam/domain/entities/question.entity';
import { IQuestionRepository } from '@core/exam/domain/repositories/question.repository';
import { QuestionType } from '@core/exam/enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Question as PrismaQuestion } from '@prisma/client';

import { parseEnum } from '@common/utils/functions/string-enum';

@Injectable()
export class QuestionPrismaMapper {
	questionTypeMap(from: string): QuestionType {
		return parseEnum(QuestionType, from);
	}

	toDomain(from: ExtendedQuestion): Question {
		return new Question({
			id: from.id,
			sectionId: from.sectionId,
			answers: from.answers.map(
				a => new Answer({ id: a.id, isCorrect: a.isCorrect, content: a.content }),
			),
			content: from.content,
			explanation: from.explanation,
			order: from.order,
			points: from.points,
			type: this.questionTypeMap(from.type),
		});
	}
	toOrm(from: Question): RepoQuestion {
		return {
			content: from.content,
			explanation: from.explanation,
			points: from.points,
			sectionId: from.sectionId,
			type: from.type,
			order: from.order,
		};
	}
}

@Injectable()
export class QuestionPrismaRepository implements IQuestionRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
		private readonly mapper: QuestionPrismaMapper,
	) {}

	async findOne(id: string): Promise<Question | null> {
		const foundQuestion = await this.txHost.tx.question.findUnique({
			where: { id },
			include: questionPrismaIncludeObj,
		});
		return foundQuestion ? this.mapper.toDomain(foundQuestion) : null;
	}

	async create(question: Question): Promise<void> {
		const data = this.mapper.toOrm(question);
		await this.txHost.tx.question.create({ data });
	}

	async update(question: Question): Promise<void> {
		const data = this.mapper.toOrm(question);
		await this.txHost.tx.question.update({ where: { id: question.id }, data });
	}

	async delete(id: string): Promise<void> {
		await this.txHost.tx.question.delete({ where: { id } });
	}
}

// extended question type with JOINS
type ExtendedQuestion = Prisma.QuestionGetPayload<{
	include: { answers: { select: { id: true; content: true; isCorrect: true } } };
}>;

type RepoQuestion = Omit<PrismaQuestion, 'id'>;

const questionPrismaIncludeObj = {
	answers: { select: { id: true, content: true, isCorrect: true } },
} satisfies Prisma.QuestionInclude;
