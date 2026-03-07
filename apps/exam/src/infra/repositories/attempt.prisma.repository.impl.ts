import { AttemptConfig } from '../../domain/entities/attempt-config.entity';
import {
	AttemptEvaluator,
	AttemptQuestion,
	FinalAttemptAnswer,
} from '../../domain/entities/attempt-evaluator.entity';
import { Attempt, AttemptAnswer } from '../../domain/entities/attempt.entity';
import {
	AttemptAnswerCreatedEvent,
	AttemptAnswerUpdatedEvent,
} from '../../domain/events/attempt.event';
import { IAttemptRepository } from '../../domain/repositories/attempt.repository';
import { QuestionType } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
	Prisma,
	Attempt as PrismaAttempt,
	AttemptAnswer as PrismaAttemptAnswer,
	PrismaClient,
} from '@prisma-client/exam';
import { Event, parseEnum } from '@server/utils';

@Injectable()
export class AttemptPrismaMapper {
	mapQuestionType(from: string): QuestionType {
		return parseEnum(QuestionType, from);
	}

	toAttemptOrm(from: Attempt): RepoAttempt {
		return { ...from };
	}

	toConfigAttemptOrm(from: AttemptConfig): RepoAttempt {
		return { ...from, examId: from.examId.id, endedAt: null };
	}

	toScoredAttemptOrm(from: AttemptEvaluator): RepoScoredAttempt {
		return { ...from };
	}

	toAttemptAnswerOrm(from: AttemptAnswer, attemptId: string): RepoAttemptAnswer {
		return { ...from, attemptId: attemptId, answers: [...from.answers] };
	}

	toAttemptEvaluatorAggregate(
		from: ExtendedAttempt,
		questions: RepoAttemptQuestionForEval[],
	): AttemptEvaluator {
		const attemptQuestions = questions.map(
			q =>
				new AttemptQuestion(
					q.id,
					this.mapQuestionType(q.type),
					q.answers.map(a => a.content),
					q.points,
				),
		);

		const answers = from.attemptAnswers.map(
			a => new FinalAttemptAnswer(a.id, a.questionId, a.answers, a.isCorrect),
		);

		return new AttemptEvaluator({
			id: from.id,
			answers: answers,
			questions: attemptQuestions,
		});
	}

	toAttemptAggregate(from: ExtendedAttempt, questions: RepoAttemptQuestion[]): Attempt {
		const attemptQuestions = questions?.map(q => ({
			id: q.id,
			type: this.mapQuestionType(q.type),
		}));

		const answers = from.attemptAnswers.map(
			a =>
				new AttemptAnswer({
					id: a.id,
					questionId: a.questionId,
					isFlagged: a.isFlagged,
					answers: a.answers,
					note: a.note,
				}),
		);

		return new Attempt({
			id: from.id,
			attemptedBy: from.attemptedBy,
			durationLimit: from.durationLimit,
			examId: from.examId,
			startedAt: from.startedAt,
			endedAt: from.endedAt,
			isStrict: from.isStrict,
			answers: answers,
			questions: attemptQuestions,
		});
	}
}

@Injectable()
export class AttemptPrismaRepository implements IAttemptRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>,
		private readonly mapper: AttemptPrismaMapper,
	) {}

	async findOne(id: string): Promise<Attempt | null> {
		const foundAttempt = await this.txHost.tx.attempt.findUnique({
			where: { id: id },
			include: attemptPrismaIncludeObject,
		});
		if (!foundAttempt) return null;
		const attemptQuestions =
			foundAttempt.attemptSections.length ?
				await this.txHost.tx.question.findMany({
					where: {
						section: {
							ancestors: {
								some: { ancestorId: { in: foundAttempt.attemptSections.map(s => s.sectionId) } },
							},
						},
					},
					select: attemptQuestionsPrismaSelectObject,
				})
			:	await this.txHost.tx.question.findMany({
					where: { section: { examId: foundAttempt.examId } },
					select: attemptQuestionsPrismaSelectObject,
				});
		return this.mapper.toAttemptAggregate(foundAttempt, attemptQuestions);
	}

	async getScoreEvaluator(attemptId: string): Promise<AttemptEvaluator | null> {
		const foundAttempt = await this.txHost.tx.attempt.findUnique({
			where: { id: attemptId },
			include: attemptPrismaIncludeObject,
		});
		if (!foundAttempt) return null;
		const attemptQuestions =
			foundAttempt.attemptSections.length ?
				await this.txHost.tx.question.findMany({
					where: {
						section: {
							ancestors: {
								some: { ancestorId: { in: foundAttempt.attemptSections.map(s => s.sectionId) } },
							},
						},
					},
					select: attemptQuestionsForEvalPrismaSelectObject,
				})
			:	await this.txHost.tx.question.findMany({
					where: { section: { examId: foundAttempt.examId } },
					select: attemptQuestionsForEvalPrismaSelectObject,
				});
		return this.mapper.toAttemptEvaluatorAggregate(foundAttempt, attemptQuestions);
	}

	async save(attempt: Attempt | AttemptConfig | AttemptEvaluator): Promise<void> {
		if (attempt instanceof Attempt) {
			const data = this.mapper.toAttemptOrm(attempt);
			await this.txHost.withTransaction(async () => {
				await this.txHost.tx.attempt.update({ where: { id: data.id }, data: data });

				for (const event of attempt.getUncommittedEvents()) {
					await this.handle(event);
				}
			});
		}
		if (attempt instanceof AttemptEvaluator) {
			const data = this.mapper.toScoredAttemptOrm(attempt);
			await this.txHost.withTransaction(async () => {
				await this.txHost.tx.attempt.update({ where: { id: data.id }, data: data });

				for (const [, answer] of attempt.answers.entries()) {
					await this.txHost.tx.answer.update({
						where: { id: answer.id },
						data: { isCorrect: answer.isCorrect },
					});
				}
			});
		}
		if (attempt instanceof AttemptConfig) {
			const data = this.mapper.toConfigAttemptOrm(attempt);
			const finishedAttemptsCount = await this.txHost.tx.attempt.count({
				where: { examId: data.examId, attemptedBy: data.attemptedBy, endedAt: null },
			});
			await this.txHost.tx.attempt.create({
				data: {
					...data,
					order: finishedAttemptsCount,
				},
			});
		}
	}

	private async handle(event: Event<any>): Promise<void> {
		if (event instanceof AttemptAnswerCreatedEvent) return await this.onAttemptAnswerCreated(event);
		if (event instanceof AttemptAnswerUpdatedEvent) return await this.onAttemptAnswerUpdated(event);
	}

	private async onAttemptAnswerCreated(event: AttemptAnswerCreatedEvent): Promise<void> {
		await this.txHost.tx.attemptAnswer.create({
			data: this.mapper.toAttemptAnswerOrm(event.payload.data, event.payload.attemptId),
		});
	}

	private async onAttemptAnswerUpdated(event: AttemptAnswerUpdatedEvent): Promise<void> {
		await this.txHost.tx.attemptAnswer.update({
			where: { id: event.payload.data.id },
			data: this.mapper.toAttemptAnswerOrm(event.payload.data, event.payload.attemptId),
		});
	}

	async deleteMany(ids: string[]): Promise<void> {
		await this.txHost.tx.attempt.deleteMany({ where: { id: { in: ids } } });
	}
}

type ExtendedAttempt = Prisma.AttemptGetPayload<{
	include: typeof attemptPrismaIncludeObject;
}>;

type RepoAttemptQuestion = Prisma.QuestionGetPayload<{
	select: typeof attemptQuestionsPrismaSelectObject;
}>;

type RepoAttemptQuestionForEval = Prisma.QuestionGetPayload<{
	select: typeof attemptQuestionsForEvalPrismaSelectObject;
}>;

const attemptPrismaIncludeObject = {
	attemptAnswers: true,
	attemptSections: {
		select: {
			sectionId: true,
		},
	},
} satisfies Prisma.AttemptInclude;

const attemptQuestionsPrismaSelectObject = {
	id: true,
	type: true,
} satisfies Prisma.QuestionSelect;

const attemptQuestionsForEvalPrismaSelectObject = {
	id: true,
	type: true,
	answers: { where: { isCorrect: true } },
	points: true,
} satisfies Prisma.QuestionSelect;

type RepoAttempt = Omit<PrismaAttempt, 'score' | 'totalPoints' | 'order'>;
type RepoScoredAttempt = Pick<PrismaAttempt, 'id' | 'score' | 'totalPoints'>;
type RepoAttemptAnswer = Omit<PrismaAttemptAnswer, 'isCorrect'>;
