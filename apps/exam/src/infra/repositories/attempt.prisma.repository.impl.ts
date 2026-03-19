import { AttemptConfig } from '../../domain/entities/attempt-config.entity';
import {
	AttemptEvaluator,
	AttemptQuestion,
	AttemptResponseResult,
} from '../../domain/entities/attempt-evaluator.entity';
import { Attempt, AttemptResponse } from '../../domain/entities/attempt.entity';
import {
	AttemptResponseCreatedEvent,
	AttemptResponseUpdatedEvent,
} from '../../domain/events/attempt.event';
import { IAttemptRepository } from '../../domain/repositories/attempt.repository';
import { QuestionType } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import {
	Prisma,
	Attempt as PrismaAttempt,
	AttemptResponse as PrismaAttemptResponse,
	PrismaClient,
} from '@prisma-client/exam';
import { Event, parseEnum } from '@server/utils';

@Injectable()
export class AttemptPrismaMapper {
	mapQuestionType(from: string): QuestionType {
		return parseEnum(QuestionType, from);
	}

	toAttemptOrm(from: Attempt): RepoAttempt {
		return {
			id: from.id,
			attemptedBy: from.attemptedBy,
			examId: from.examId,
			durationLimit: from.durationLimit,
			startedAt: from.startedAt,
			endedAt: from.endedAt,
			isStrict: from.isStrict,
		};
	}

	toConfigAttemptOrm(from: AttemptConfig): RepoAttemptConfig {
		return {
			id: from.id,
			attemptedBy: from.attemptedBy,
			examId: from.examId.id,
			durationLimit: from.durationLimit,
			isStrict: from.isStrict,
			startedAt: from.startedAt,
		};
	}

	toScoredAttemptOrm(from: AttemptEvaluator): RepoScoredAttempt {
		return { id: from.id, score: from.score, totalPoints: from.totalPoints };
	}

	toAttemptResponseOrm(from: AttemptResponse, attemptId: string): RepoAttemptResponse {
		return {
			id: from.id,
			isFlagged: from.isFlagged,
			note: from.note,
			questionId: from.questionId,
			attemptId: attemptId,
			answers: [...from.answers],
		};
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
					q.choices.map(c => c.key),
					q.points,
				),
		);

		const responses = from.attemptResponses.map(
			r => new AttemptResponseResult(r.id, r.questionId, r.answers, r.isCorrect),
		);

		return new AttemptEvaluator({
			id: from.id,
			responses: responses,
			questions: attemptQuestions,
		});
	}

	toAttemptAggregate(from: ExtendedAttempt, questions: RepoAttemptQuestion[]): Attempt {
		const attemptQuestions = questions?.map(q => ({
			id: q.id,
			type: this.mapQuestionType(q.type),
		}));

		const responses = from.attemptResponses.map(
			r =>
				new AttemptResponse({
					id: r.id,
					questionId: r.questionId,
					isFlagged: r.isFlagged,
					answers: r.answers,
					note: r.note,
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
			responses: responses,
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

	async getAttemptedUser(attemptId: string): Promise<string> {
		const attempt = await this.txHost.tx.attempt.findUnique({
			where: { id: attemptId },
			select: { attemptedBy: true },
		});
		if (!attempt) throw new NotFoundException('Attempt not found');
		return attempt.attemptedBy;
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

				for (const [, response] of attempt.responses.entries()) {
					await this.txHost.tx.attemptResponse.update({
						where: { id: response.id },
						data: { isCorrect: response.isCorrect },
					});
				}
			});
		}
		if (attempt instanceof AttemptConfig) {
			const data = this.mapper.toConfigAttemptOrm(attempt);
			const finishedAttemptsCount = await this.txHost.tx.attempt.count({
				where: { examId: data.examId, attemptedBy: data.attemptedBy, endedAt: { not: null } },
			});
			await this.txHost.withTransaction(async () => {
				try {
					await this.txHost.tx.attempt.create({
						data: {
							...data,
							order: finishedAttemptsCount,
						},
					});
				} catch (e) {
					if (e instanceof Prisma.PrismaClientKnownRequestError) {
						if (e.code === 'P2002') {
							throw new MethodNotAllowedException('Please submit the previous attempt');
						}
					}
					throw e;
				}

				if (attempt.sectionIds)
					await this.txHost.tx.attemptSection.createMany({
						data: attempt.sectionIds.map(s => ({ sectionId: s, attemptId: attempt.id })),
					});
			});
		}
	}

	private async handle(event: Event<any>): Promise<void> {
		if (event instanceof AttemptResponseCreatedEvent)
			return await this.onAttemptResponseCreated(event);
		if (event instanceof AttemptResponseUpdatedEvent)
			return await this.onAttemptResponseUpdated(event);
	}

	private async onAttemptResponseCreated(event: AttemptResponseCreatedEvent): Promise<void> {
		await this.txHost.tx.attemptResponse.create({
			data: this.mapper.toAttemptResponseOrm(event.payload.data, event.payload.attemptId),
		});
	}

	private async onAttemptResponseUpdated(event: AttemptResponseUpdatedEvent): Promise<void> {
		await this.txHost.tx.attemptResponse.update({
			where: { id: event.payload.data.id },
			data: this.mapper.toAttemptResponseOrm(event.payload.data, event.payload.attemptId),
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
	attemptResponses: true,
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
	choices: { where: { isCorrect: true } },
	points: true,
} satisfies Prisma.QuestionSelect;

type RepoAttempt = Omit<PrismaAttempt, 'score' | 'totalPoints' | 'order'>;
type RepoAttemptConfig = Omit<RepoAttempt, 'endedAt'>;
type RepoScoredAttempt = Pick<PrismaAttempt, 'id' | 'score' | 'totalPoints'>;
type RepoAttemptResponse = Omit<PrismaAttemptResponse, 'isCorrect'>;
