import { QuestionType } from '../../enums/question-type.enum';
import {
	AttemptAnswerCreatedEvent,
	AttemptAnswerUpdatedEvent,
	AttemptSubmittedEvent,
} from '../events/attempt.event';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IEntity } from '@server/utils';

export class AttemptAnswer implements IEntity<AttemptAnswer> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public questionId: string;
	public isFlagged: boolean;
	public answers: Set<string>;
	public note: string | null;

	public constructor(constructorOptions: {
		id?: string;
		questionId: string;
		isFlagged?: boolean;
		answers?: string[];
		note?: string | null;
	}) {
		this.id = AttemptAnswer.newId();
		this.questionId = constructorOptions.questionId;
		this.isFlagged = constructorOptions.isFlagged ?? false;
		this.answers = new Set(constructorOptions.answers);
		this.note = constructorOptions.note ?? null;
	}

	public setAnswer(answer: string): void {
		if (this.answers.has(answer)) throw new ConflictException('Duplicate answer option');
		this.answers.add(answer);
	}

	public deleteAnswer(answer: string): void {
		if (!this.answers.has(answer)) throw new NotFoundException('AAnswer not found');
		this.answers.delete(answer);
	}

	public clearAnswers(): void {
		this.answers.clear();
	}

	public toggleFlag(): void {
		this.isFlagged = !this.isFlagged;
	}

	public setNote(note: string): void {
		this.note = note;
	}
}

export class Attempt extends AggregateRoot<Event<any>> implements IEntity<Attempt> {
	public static newId() {
		return crypto.randomUUID();
	}

	private static maximumNetworkDelayInSeconds = 30; //seconds

	public readonly id: string;
	public attemptedBy: string;
	public examId: string;
	public startedAt: Date;
	public endedAt: Date | null;
	public durationLimit: number;
	public readonly questions: Map<string, QuestionType>;
	public answers: AttemptAnswer[];
	public isStrict: boolean;

	public constructor(constructorOptions: {
		id?: string;
		attemptedBy: string;
		examId: string;
		startedAt: Date;
		endedAt?: Date | null;
		durationLimit: number; // in seconds
		questions?: { id: string; type: QuestionType }[];
		answers?: AttemptAnswer[];
		isStrict?: boolean;
	}) {
		super();
		this.id = constructorOptions.id ?? Attempt.newId();
		this.attemptedBy = constructorOptions.attemptedBy;
		this.examId = constructorOptions.examId;
		this.questions = new Map(constructorOptions.questions?.map(q => [q.id, q.type]));
		this.startedAt = constructorOptions.startedAt;
		this.endedAt = constructorOptions.endedAt ?? null;
		this.durationLimit = constructorOptions.durationLimit;
		this.answers = constructorOptions.answers ?? [];
		this.isStrict = constructorOptions.isStrict ?? false;
	}

	private isWithinAllowedTime(timeStamp: Date): boolean {
		return (
			timeStamp.getTime() <
			this.startedAt.getTime() + (this.durationLimit + Attempt.maximumNetworkDelayInSeconds) * 1000
		);
	}

	private assertModifiable(timeStamp: Date): void {
		if (this.endedAt) throw new ConflictException('Exam result has already been submitted');
		if (!this.isWithinAllowedTime(timeStamp))
			throw new ForbiddenException('Exam submission time has expired');
	}

	// check if the question exists in the section in the domain service layer
	// pass timeStamp in as early as possible
	public answer(questionId: string, answer: string, timeStamp: Date): void {
		this.assertModifiable(timeStamp);
		if (!this.questions.has(questionId))
			throw new ConflictException("Question isn't included in this attempt");
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			this.answerBasedOnQuestionType(existingAnswer, answer);
			this.apply(
				new AttemptAnswerUpdatedEvent({
					attemptId: this.id,
					data: structuredClone(existingAnswer),
				}),
			);
		} else {
			const newAnswer = new AttemptAnswer({ questionId: questionId, answers: [answer] });
			this.answers.push(newAnswer);
			this.apply(
				new AttemptAnswerCreatedEvent({ attemptId: this.id, data: structuredClone(newAnswer) }),
			);
		}
	}

	private answerBasedOnQuestionType(attemptAnswer: AttemptAnswer, answer: string): void {
		const replaceTypes = [
			QuestionType.FillInTheBlank,
			QuestionType.MultipleChoiceSingle,
			QuestionType.Writing,
		];
		const questionType = this.questions.get(attemptAnswer.questionId);
		if (!questionType)
			throw new ConflictException('Attempting to answer question outside selected sections');
		if (replaceTypes.includes(questionType)) {
			attemptAnswer.clearAnswers();
			attemptAnswer.setAnswer(answer);
			return;
		}
		attemptAnswer.setAnswer(answer);
	}

	public deleteAnswer(questionId: string, answer: string, timeStamp: Date): void;
	public deleteAnswer(questionId: string, timeStamp: Date): void;
	// pass timeStamp in as early as possible
	public deleteAnswer(
		questionId: string,
		answerOrTimestamp: string | Date,
		maybeTimeStamp?: Date,
	): void {
		let answer: string | null;
		let timeStamp: Date;

		if (answerOrTimestamp instanceof Date) {
			answer = null;
			timeStamp = answerOrTimestamp;
		} else {
			answer = answerOrTimestamp;
			if (!maybeTimeStamp) {
				throw new Error('Timestamp is required when deleting specific answer');
			}
			timeStamp = maybeTimeStamp;
		}

		this.assertModifiable(timeStamp);
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (!existingAnswer) throw new NotFoundException('Answer not found');
		if (answer) existingAnswer.deleteAnswer(answer);
		else existingAnswer.clearAnswers();
		this.apply(
			new AttemptAnswerUpdatedEvent({ attemptId: this.id, data: structuredClone(existingAnswer) }),
		);
	}

	public addNote(questionId: string, note: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.setNote(note);
			this.apply(
				new AttemptAnswerUpdatedEvent({
					attemptId: this.id,
					data: structuredClone(existingAnswer),
				}),
			);
		} else {
			const newAnswer = new AttemptAnswer({ questionId: questionId, note: note });
			this.answers.push(newAnswer);
			this.apply(
				new AttemptAnswerCreatedEvent({ attemptId: this.id, data: structuredClone(newAnswer) }),
			);
		}
	}

	public toggleFlag(questionId: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.toggleFlag();
			this.apply(
				new AttemptAnswerUpdatedEvent({
					attemptId: this.id,
					data: structuredClone(existingAnswer),
				}),
			);
		} else {
			const newAnswer = new AttemptAnswer({ questionId: questionId, isFlagged: true });
			this.answers.push(newAnswer);
			this.apply(
				new AttemptAnswerCreatedEvent({ attemptId: this.id, data: structuredClone(newAnswer) }),
			);
		}
	}

	// pass timeStamp in as early as possible
	public endAttempt(timeStamp: Date): void {
		if (this.endedAt) throw new ConflictException('Exam result has already been submitted');
		if (!this.answers.length) {
			if (this.isWithinAllowedTime(timeStamp))
				throw new ForbiddenException('Must at least answer one question before submitting');
		}
		this.endedAt = timeStamp;
		this.apply(new AttemptSubmittedEvent({ attemptId: this.id }));
	}
}

export type AttemptAnswerUpdatableProperties = Partial<Omit<AttemptAnswer, 'id'>>;
