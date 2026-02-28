import { IEntity, IValueObject } from '@server/utils';

export class FinalAttemptAnswer implements IValueObject<FinalAttemptAnswer> {
	public constructor(public readonly id: string) {}

	public equals(other: any): boolean {
		return other instanceof FinalAttemptAnswer && this.id === other.id;
	}
}

export class AttemptQuestion implements IValueObject<AttemptQuestion> {
	public constructor(public readonly id: string) {}

	equals(other: any): boolean {
		return other instanceof AttemptQuestion && this.id === other.id;
	}
}

export class AttemptEvaluator implements IEntity<AttemptEvaluator> {
	public readonly id: string;
	public readonly questions: AttemptQuestion[];
	public readonly answers: FinalAttemptAnswer[];
	public score: number | null;
	public totalPoints: number | null;

	public constructor(constructorOptions: {
		id: string;
		questions: AttemptQuestion[];
		answers: FinalAttemptAnswer[];
		score?: number;
		totalPoints?: number;
	}) {
		this.id = constructorOptions.id;
		this.questions = constructorOptions.questions;
		this.answers = constructorOptions.answers;
		this.score = constructorOptions.score ?? null;
		this.totalPoints = constructorOptions.totalPoints ?? null;
	}

	public evaluateScore(): void {
		return;
	}
}
