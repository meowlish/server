import {
	AttemptAnswerCreatedEvent,
	AttemptAnswerUpdatedEvent,
	AttemptSubmittedEvent,
} from '../events/attempt.event';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IEntity, IValueObject } from '@server/utils';

export class AttemptAnswer implements IValueObject<AttemptAnswer> {
	public questionId: string;
	public isFlagged: boolean;
	public answer: string | null;
	public note: string | null;

	public constructor(constructorOptions: {
		questionId: string;
		isFlagged?: boolean;
		answer?: string;
		note?: string;
	}) {
		this.questionId = constructorOptions.questionId;
		this.isFlagged = constructorOptions.isFlagged ?? false;
		this.answer = constructorOptions.answer ?? null;
		this.note = constructorOptions.note ?? null;
	}

	public equals(vo: AttemptAnswer): boolean {
		return this.questionId === vo.questionId;
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
	public questionIds: string[] | null;
	public answers: AttemptAnswer[];
	public isStrict: boolean;

	public constructor(constructorOptions: {
		id?: string;
		attemptedBy: string;
		examId: string;
		startedAt: Date;
		endedAt?: Date;
		durationLimit: number; // in seconds
		questionIds?: string[];
		answers?: AttemptAnswer[];
		isStrict?: boolean;
	}) {
		super();
		this.id = constructorOptions.id ?? Attempt.newId();
		this.attemptedBy = constructorOptions.attemptedBy;
		this.examId = constructorOptions.examId;
		this.questionIds = constructorOptions.questionIds ?? null;
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
	public answer(answer: AttemptAnswer, timeStamp: Date): void {
		this.assertModifiable(timeStamp);
		const existingAnswer = this.answers.find(a => a.equals(answer));
		if (existingAnswer) {
			{
				existingAnswer.answer = answer.answer;
				this.apply(
					new AttemptAnswerUpdatedEvent({ attemptId: this.id, data: { answer: answer.answer } }),
				);
			}
		} else {
			this.answers.push(answer);
			this.apply(
				new AttemptAnswerCreatedEvent({ attemptId: this.id, data: structuredClone(answer) }),
			);
		}
	}

	// pass timeStamp in as early as possible
	public deleteAnswer(questionId: string, timeStamp: Date): void {
		this.assertModifiable(timeStamp);
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (!existingAnswer) throw new NotFoundException('Answer not found');
		existingAnswer.answer = null;
		this.apply(new AttemptAnswerUpdatedEvent({ attemptId: this.id, data: { answer: null } }));
	}

	public addNote(questionId: string, note: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.note = note;
			this.apply(new AttemptAnswerUpdatedEvent({ attemptId: this.id, data: { note: note } }));
		} else {
			const newAnswer = new AttemptAnswer({ questionId, note });
			this.answers.push(newAnswer);
			this.apply(
				new AttemptAnswerCreatedEvent({ attemptId: this.id, data: structuredClone(newAnswer) }),
			);
		}
	}

	public toggleFlag(questionId: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.isFlagged = !existingAnswer.isFlagged;
			this.apply(
				new AttemptAnswerUpdatedEvent({
					attemptId: this.id,
					data: { isFlagged: existingAnswer.isFlagged },
				}),
			);
		} else {
			const newAnswer = new AttemptAnswer({ questionId, isFlagged: true });
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
