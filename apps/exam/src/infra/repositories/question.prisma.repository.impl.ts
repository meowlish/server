import { ExamId } from '../../domain/entities/exam.entity';
import { Choice, Question } from '../../domain/entities/question.entity';
import {
	ChoiceCreatedEvent,
	ChoiceDeletedEvent,
	ChoiceUpdatedEvent,
} from '../../domain/events/exam-management.event';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { ExamStatus } from '../../enums/exam-status.enum';
import { QuestionType } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
	Prisma,
	Choice as PrismaChoice,
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
			choices: from.choices.map(
				c =>
					new Choice({
						id: c.id,
						isCorrect: c.isCorrect,
						key: c.key,
						content: c.content,
					}),
			),
			content: from.content,
			explanation: from.explanation,
			points: from.points,
			type: this.mapQuestionType(from.type),
		});
	}

	toChoiceOrm(from: Choice, questionId: string): PrismaChoice {
		return {
			id: from.id,
			key: from.key,
			content: from.key,
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
		if (event instanceof ChoiceCreatedEvent) return await this.onChoiceCreated(event);
		if (event instanceof ChoiceDeletedEvent) return await this.onChoiceDeleted(event);
		if (event instanceof ChoiceUpdatedEvent) return await this.onChoiceUpdated(event);
	}

	private async onChoiceCreated(event: ChoiceCreatedEvent): Promise<void> {
		await this.txHost.tx.choice.create({
			data: this.mapper.toChoiceOrm(event.payload.data, event.payload.questionId),
		});
	}

	private async onChoiceDeleted(event: ChoiceDeletedEvent): Promise<void> {
		await this.txHost.tx.choice.delete({ where: { id: event.payload.choiceId } });
	}

	private async onChoiceUpdated(event: ChoiceUpdatedEvent): Promise<void> {
		await this.txHost.tx.choice.update({
			where: { id: event.payload.choiceId },
			data: this.mapper.toChoiceOrm(event.payload.data, event.payload.questionId),
		});
	}
}

// extended question type with JOINS
type ExtendedQuestion = Prisma.QuestionGetPayload<{
	include: typeof questionPrismaIncludeObj;
}>;

type RepoQuestion = Omit<PrismaQuestion, 'order'>;

const questionPrismaIncludeObj = {
	choices: true,
	section: { select: { exam: { select: { id: true, version: true, status: true } } } },
} satisfies Prisma.QuestionInclude;
