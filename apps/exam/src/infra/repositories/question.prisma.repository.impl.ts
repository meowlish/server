import { ExamId } from '../../domain/entities/exam.entity';
import { Answer, Question } from '../../domain/entities/question.entity';
import {
	AnswerCreatedEvent,
	AnswerDeletedEvent,
	AnswerUpdatedEvent,
} from '../../domain/events/exam-management.event';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { ExamStatus } from '../../enums/exam-status.enum';
import { QuestionType } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
	Prisma,
	Answer as PrismaAnswer,
	PrismaClient,
	Question as PrismaQuestion,
} from '@prisma-client/exam';
import { parseEnum } from '@server/utils';
import { Event } from '@server/utils';

@Injectable()
export class QuestionPrismaMapper {
	mapQuestionType(from: string): QuestionType {
		return parseEnum(QuestionType, from);
	}

	mapExamStatus(from: string): ExamStatus {
		return parseEnum(ExamStatus, from);
	}

	toQuestionAggregate(from: ExtendedQuestion): Question {
		return new Question({
			id: from.id,
			examId: new ExamId(from.section.exam.id, from.section.exam.version),
			examStatus: this.mapExamStatus(from.section.exam.status),
			sectionId: from.sectionId,
			answers: from.answers.map(
				a => new Answer({ id: a.id, isCorrect: a.isCorrect, content: a.content }),
			),
			content: from.content,
			explanation: from.explanation,
			points: from.points,
			type: this.mapQuestionType(from.type),
		});
	}

	toAnswerOrm(from: Answer, questionId: string): PrismaAnswer {
		return {
			id: from.id,
			content: from.content,
			isCorrect: from.isCorrect,
			questionId: questionId,
		};
	}

	toQuestionOrm(from: Question): RepoQuestion {
		return {
			id: from.id,
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
			where: { id: id },
			include: questionPrismaIncludeObj,
		});
		return foundQuestion ? this.mapper.toQuestionAggregate(foundQuestion) : null;
	}

	async save(question: Question): Promise<void> {
		const data = this.mapper.toQuestionOrm(question);

		await this.txHost.withTransaction(async () => {
			// optimistic lock
			await this.txHost.tx.question.update({
				where: {
					id: data.id,
					section: { exam: { id: question.examId.id, version: question.examId.version } },
				},
				data: data,
			});

			// handle events
			for (const event of question.getUncommittedEvents()) {
				await this.handle(event);
			}

			await this.txHost.tx.exam.update({
				where: { id: question.examId.id, version: question.examId.version },
				data: { version: { increment: 1 } },
			});
		});
	}

	private async handle(event: Event<any>): Promise<void> {
		if (event instanceof AnswerCreatedEvent) return await this.onAnswerCreated(event);
		if (event instanceof AnswerDeletedEvent) return await this.onAnswerDeleted(event);
		if (event instanceof AnswerUpdatedEvent) return await this.onAnswerUpdated(event);
	}

	private async onAnswerCreated(event: AnswerCreatedEvent): Promise<void> {
		await this.txHost.tx.answer.create({
			data: this.mapper.toAnswerOrm(event.payload.data, event.payload.questionId),
		});
	}

	private async onAnswerDeleted(event: AnswerDeletedEvent): Promise<void> {
		await this.txHost.tx.answer.delete({ where: { id: event.payload.answerId } });
	}

	private async onAnswerUpdated(event: AnswerUpdatedEvent): Promise<void> {
		await this.txHost.tx.answer.update({
			where: { id: event.payload.answerId },
			data: this.mapper.toAnswerOrm(event.payload.data, event.payload.questionId),
		});
	}
}

// extended question type with JOINS
type ExtendedQuestion = Prisma.QuestionGetPayload<{
	include: typeof questionPrismaIncludeObj;
}>;

type RepoQuestion = Omit<PrismaQuestion, 'order'>;

const questionPrismaIncludeObj = {
	answers: true,
	section: { select: { exam: { select: { id: true, version: true, status: true } } } },
} satisfies Prisma.QuestionInclude;
