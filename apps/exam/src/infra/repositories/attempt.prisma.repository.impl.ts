import { AttemptConfig } from '../../domain/entities/attempt-config.entity';
import { AttemptEvaluator } from '../../domain/entities/attempt-evaluator.entity';
import { Attempt, AttemptAnswer } from '../../domain/entities/attempt.entity';
import { IAttemptRepository } from '../../domain/repositories/attempt.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Attempt as PrismaAttempt, PrismaClient } from '@prisma-client/exam';

@Injectable()
export class AttemptPrismaMapper {
	toAttemptOrm(from: Attempt): RepoAttempt {
		return { ...from };
	}

	toConfigAttemptOrm(from: AttemptConfig): RepoAttempt {
		return { ...from, examId: from.examId.id, endedAt: null };
	}

	toScoredAttemptOrm(from: AttemptEvaluator): RepoScoredAttempt {
		return { ...from };
	}

	toAttemptAggregate(from: ExtendedAttempt): Attempt {
		const questionIds = [
			...from.attemptSections.flatMap(s =>
				s.section.descendants.flatMap(d => d.descendant.questions.map(q => q.id)),
			),
		];

		return new Attempt({
			id: from.id,
			attemptedBy: from.attemptedBy,
			durationLimit: from.durationLimit,
			examId: from.examId,
			startedAt: from.startedAt,
			endedAt: from.endedAt,
			isStrict: from.isStrict,
			answers: from.attemptAnswers.map(
				a =>
					new AttemptAnswer({
						id: a.attemptId,
						questionId: a.questionId,
						isFlagged: a.isFlagged,
						answers: a.answers,
						note: a.note,
					}),
			),
			questionIds: questionIds,
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
		const foundAttempt = await this.txHost.tx.attempt.findFirst({
			where: { id: id },
			include: attemptPrismaIncludeObject,
		});
		return foundAttempt ? this.mapper.toAttemptAggregate(foundAttempt) : null;
	}

	async save(attempt: Attempt | AttemptConfig | AttemptEvaluator): Promise<void> {
		if (attempt instanceof Attempt) {
			const data = this.mapper.toAttemptOrm(attempt);
			await this.txHost.tx.attempt.update({ where: { id: data.id }, data: data });
		}
		if (attempt instanceof AttemptEvaluator) {
			const data = this.mapper.toScoredAttemptOrm(attempt);
			await this.txHost.tx.attempt.update({ where: { id: data.id }, data: data });
		}
		if (attempt instanceof AttemptConfig) {
			const data = this.mapper.toConfigAttemptOrm(attempt);
			await this.txHost.tx.attempt.create({ data: data });
		}
	}
}

type ExtendedAttempt = Prisma.AttemptGetPayload<{
	include: typeof attemptPrismaIncludeObject;
}>;

const attemptPrismaIncludeObject = {
	attemptAnswers: true,
	attemptSections: {
		select: {
			section: {
				select: {
					descendants: {
						select: { descendant: { select: { questions: { select: { id: true } } } } },
					},
				},
			},
		},
	},
} satisfies Prisma.AttemptInclude;

type RepoAttempt = Omit<PrismaAttempt, 'score' | 'totalPoints'>;
type RepoScoredAttempt = Pick<PrismaAttempt, 'id' | 'score' | 'totalPoints'>;
