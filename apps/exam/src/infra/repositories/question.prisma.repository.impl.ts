import { Answer, Question } from '../../domain/entities/question.entity';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { QuestionType } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Question as PrismaQuestion } from '@prisma-client/exam';
import { Action } from '@server/utils';
import { parseEnum } from '@server/utils';

@Injectable()
export class QuestionPrismaMapper {
	mapQuestionType(from: string): QuestionType {
		return parseEnum(QuestionType, from);
	}

	toDomain(from: ExtendedQuestion): Question {
		return new Question({
			id: from.id,
			sectionId: from.sectionId,
			answers: from.answers.map(a => new Answer({ isCorrect: a.isCorrect, content: a.content })),
			content: from.content,
			explanation: from.explanation,
			points: from.points,
			type: this.mapQuestionType(from.type),
		});
	}

	toOrm(from: Question): RepoQuestion {
		return {
			content: from.content,
			explanation: from.explanation,
			points: from.points,
			sectionId: from.sectionId,
			type: from.type,
		};
	}
}

@Injectable()
export class QuestionPrismaRepository implements IQuestionRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>,
		private readonly mapper: QuestionPrismaMapper,
	) {}

	async findOne(id: string): Promise<Question | null> {
		const foundQuestion = await this.txHost.tx.question.findUnique({
			where: { id },
			include: questionPrismaIncludeObj,
		});
		return foundQuestion ? this.mapper.toDomain(foundQuestion) : null;
	}

	async update(question: Question): Promise<void> {
		const data = this.mapper.toOrm(question);
		const answersToAdd: Answer[] = [];
		const answersToDelete: Answer[] = [];
		question.answers.forEach(a => {
			switch (a.action) {
				case Action.CREATE:
					answersToAdd.push(a);
					break;

				case Action.DELETE:
					answersToDelete.push(a);
					break;

				default:
					return;
			}
		});
		await this.txHost.withTransaction(async () => {
			await this.txHost.tx.answer.createMany({
				data: answersToAdd.map(a => ({
					questionId: question.id,
					content: a.content,
					isCorrect: a.isCorrect,
				})),
			});
			for (const a of answersToDelete) {
				await this.txHost.tx.answer.delete({
					where: { questionId_content: { questionId: question.id, content: a.content } },
				});
			}
			await this.txHost.tx.question.update({ where: { id: question.id }, data });
		});
	}

	async delete(id: string): Promise<void> {
		await this.txHost.tx.question.delete({ where: { id } });
	}
}

// extended question type with JOINS
type ExtendedQuestion = Prisma.QuestionGetPayload<{
	include: { answers: { select: { content: true; isCorrect: true } } };
}>;

type RepoQuestion = Omit<PrismaQuestion, 'id' | 'order'>;

const questionPrismaIncludeObj = {
	answers: { select: { content: true, isCorrect: true } },
} satisfies Prisma.QuestionInclude;
