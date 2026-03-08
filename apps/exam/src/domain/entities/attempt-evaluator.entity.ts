import { QuestionType } from '../../enums/question-type.enum';
import { AttemptScoredEvent } from '../events/attempt.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate, IEntity } from '@server/utils';
import { isEqual } from 'lodash';

export class FinalAttemptAnswer implements IEntity<FinalAttemptAnswer> {
	public isCorrect: boolean;

	public constructor(
		public readonly id: string,
		public readonly questionId: string,
		public readonly answers: string[],
		isCorrect?: boolean | null,
	) {
		answers.sort();
		this.isCorrect = !!isCorrect;
	}

	public setIsCorrect(isCorrect: boolean): void {
		this.isCorrect = isCorrect;
	}
}

export class AttemptQuestion implements IEntity<AttemptQuestion> {
	public constructor(
		public readonly id: string,
		public readonly type: QuestionType,
		public readonly correctAnswers: string[],
		public readonly points: number,
	) {
		correctAnswers.sort();
	}
}

export class AttemptEvaluator
	extends AggregateRoot<Event<any>>
	implements IAggregate<AttemptEvaluator>
{
	public readonly id: string;
	public readonly questions: AttemptQuestion[];
	public readonly answers: Map<string, FinalAttemptAnswer>;
	public score: number;
	public totalPoints: number;

	public constructor(constructorOptions: {
		id: string;
		questions: AttemptQuestion[];
		answers: FinalAttemptAnswer[];
		score?: number;
		totalPoints?: number;
	}) {
		super();
		this.id = constructorOptions.id;
		this.questions = constructorOptions.questions;
		this.answers = new Map(constructorOptions.answers.map(a => [a.questionId, a]));
		this.score = constructorOptions.score ?? 0;
		this.totalPoints = constructorOptions.totalPoints ?? 0;
	}

	public evaluateScore(): void {
		this.questions.forEach(question => {
			this.totalPoints += question.points;
			const answer = this.answers.get(question.id);
			if (answer) {
				this.score += this.scoreFor(question, answer);
			}
		});
		this.apply(
			new AttemptScoredEvent({
				attemptId: this.id,
				score: this.score,
				totalPoints: this.totalPoints,
			}),
		);
	}

	private scoreFor(question: AttemptQuestion, answer: FinalAttemptAnswer): number {
		// TODO: writing score logic later
		if (question.type === QuestionType.Writing) return 0;
		if (isEqual(answer.answers, question.correctAnswers)) {
			answer.setIsCorrect(true);
			return question.points;
		}
		answer.setIsCorrect(false);
		return 0;
	}
}
