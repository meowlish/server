import { IEntity, IValueObject } from '@server/utils';

export class FinalAttemptAnswer implements IValueObject<FinalAttemptAnswer> {
	public constructor(public readonly id: string) {}

	public equals(vo: FinalAttemptAnswer): boolean {
		return this.id === vo.id;
	}

	public hashCode(): number {
		return 1;
	}
}

export class AttemptQuestion implements IValueObject<AttemptQuestion> {
	public constructor(public readonly id: string) {}

	equals(vo: AttemptQuestion): boolean {
		return this.id === vo.id;
	}

	public hashCode(): number {
		return 1;
	}
}

export class AttemptEvaluator implements IEntity<AttemptEvaluator> {
	public readonly id: string;
	public readonly version: number;
	public readonly questions: AttemptQuestion[];
	public readonly answers: FinalAttemptAnswer[];
	public score: number | null;
	public totalPoints: number | null;

	public constructor(constructorOptions: {
		id: string;
		version: number;
		questions: AttemptQuestion[];
		answers: FinalAttemptAnswer[];
		score?: number;
		totalPoints?: number;
	}) {
		this.id = constructorOptions.id;
		this.version = constructorOptions.version;
		this.questions = constructorOptions.questions;
		this.answers = constructorOptions.answers;
		this.score = constructorOptions.score ?? null;
		this.totalPoints = constructorOptions.totalPoints ?? null;
	}

	public evaluateScore(): void {
		return;
	}
}
