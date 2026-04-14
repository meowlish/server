import { QuestionType, questionTypesThatAllowNonStrictMatch } from '../../enums/question-type.enum';
import { AttemptScoredEvent } from '../events/attempt.event';
import { WritingSubmittedEvent } from '../events/writing-submitted';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate, IEntity } from '@server/utils';
import { isEqual } from 'lodash';

export class AttemptResponseResult implements IEntity<AttemptResponseResult> {
	public isCorrect: boolean;

	public constructor(
		public readonly id: string,
		public readonly questionId: string,
		public readonly answers: string[],
		isCorrect?: boolean | null,
	) {
		this.answers = answers.map(a => a.toLowerCase()).sort();
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
		public readonly correctKeys: string[],
		public readonly points: number,
	) {
		this.correctKeys = correctKeys.map(a => a.toLowerCase()).sort();
	}
}

export class AttemptEvaluator
	extends AggregateRoot<Event<any>>
	implements IAggregate<AttemptEvaluator>
{
	public readonly id: string;
	public readonly questions: AttemptQuestion[];
	public readonly responses: Map<string, AttemptResponseResult>;
	public score: number;
	public totalPoints: number;

	public constructor(constructorOptions: {
		id: string;
		questions: AttemptQuestion[];
		responses: AttemptResponseResult[];
		score?: number;
		totalPoints?: number;
	}) {
		super();
		this.id = constructorOptions.id;
		this.questions = constructorOptions.questions;
		this.responses = new Map(constructorOptions.responses.map(r => [r.questionId, r]));
		this.score = constructorOptions.score ?? 0;
		this.totalPoints = constructorOptions.totalPoints ?? 0;
	}

	public evaluateScore(): void {
		this.questions.forEach(question => {
			this.totalPoints += question.points;
			const response = this.responses.get(question.id);
			if (response) {
				this.score += this.scoreFor(question, response);
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

	private scoreFor(question: AttemptQuestion, response: AttemptResponseResult): number {
		if (question.type === QuestionType.Writing) {
			this.apply(
				new WritingSubmittedEvent({
					attemptId: this.id,
					responseId: response.id,
					questionId: question.id,
					responseContent: response.answers[0] ?? '',
				}),
			);
			return 0;
		}
		// If question types only need user to match one of the many correct keys
		if (questionTypesThatAllowNonStrictMatch.includes(question.type)) {
			if (question.correctKeys.some(k => response.answers.includes(k))) {
				response.setIsCorrect(true);
				return question.points;
			}
		}
		// Else must match all keys
		else if (isEqual(response.answers, question.correctKeys)) {
			response.setIsCorrect(true);
			return question.points;
		}
		response.setIsCorrect(false);
		return 0;
	}
}
