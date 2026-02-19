import { ConflictException, ForbiddenException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Action, IEntity, IValueObject } from '@server/utils';

export class AttemptAnswer implements IValueObject<AttemptAnswer> {
	public questionId: string;
	public isFlagged: boolean;
	public answer: string | null;
	public action: Action;
	public note: string | null;

	public constructor(constructorOptions: {
		questionId: string;
		isFlagged?: boolean;
		answer?: string;
		action?: Action;
		note?: string;
	}) {
		this.questionId = constructorOptions.questionId;
		this.isFlagged = constructorOptions.isFlagged ?? false;
		this.answer = constructorOptions.answer ?? null;
		this.note = constructorOptions.note ?? null;
		this.action = constructorOptions.action ?? Action.READ;
	}

	public equals(vo: AttemptAnswer): boolean {
		return this.questionId === vo.questionId;
	}
}

export class Attempt extends AggregateRoot implements IEntity<Attempt> {
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
	public hasAtLeastOneAnswer: boolean;
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
		hasAtLeastOneAnswer?: boolean;
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
		this.hasAtLeastOneAnswer = constructorOptions.hasAtLeastOneAnswer ?? false;
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
				existingAnswer.action = Action.UPDATE;
			}
		} else {
			answer.action = Action.CREATE;
			this.answers.push(answer);
		}
	}

	// pass timeStamp in as early as possible
	public deleteAnswer(questionId: string, timeStamp: Date): void {
		this.assertModifiable(timeStamp);
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			{
				existingAnswer.answer = null;
				existingAnswer.action = Action.UPDATE;
			}
		}
	}

	public addNote(questionId: string, note: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.note = note;
			existingAnswer.action = Action.UPDATE;
		} else this.answers.push(new AttemptAnswer({ questionId, action: Action.CREATE }));
	}

	public toggleFlag(questionId: string): void {
		const existingAnswer = this.answers.find(a => a.questionId === questionId);
		if (existingAnswer) {
			existingAnswer.isFlagged = !existingAnswer.isFlagged;
			existingAnswer.action = Action.UPDATE;
		} else
			this.answers.push(new AttemptAnswer({ questionId, isFlagged: true, action: Action.CREATE }));
	}

	// pass timeStamp in as early as possible
	public endAttempt(timeStamp: Date): void {
		if (this.endedAt) throw new ConflictException('Exam result has already been submitted');
		if (!this.hasAtLeastOneAnswer) {
			if (this.isWithinAllowedTime(timeStamp)) {
				throw new ForbiddenException('Must at least answer one question before submitting');
			}
		}
		this.endedAt = timeStamp;
	}

	public equals(entity: Attempt): boolean {
		return this.id === entity.id;
	}
}
