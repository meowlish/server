import { Attempt } from './attempt.entity';
import { IEntity } from '@server/utils';

export class AttemptConfig implements IEntity<AttemptConfig> {
	public static newId() {
		return Attempt.newId();
	}

	public readonly id: string;
	public examId: string;
	public sectionIds: string[] | null;
	public attemptedBy: string;
	public startedAt: Date;
	public durationLimit: number;
	public isStrict: boolean;

	public constructor(constructorOptions: {
		id?: string;
		examId: string;
		sectionIds?: string[];
		attemptedBy: string;
		startedAt: Date;
		durationLimit: number;
		isStrict?: boolean;
	}) {
		this.id = constructorOptions.id ?? AttemptConfig.newId();
		this.examId = constructorOptions.examId;
		this.sectionIds = constructorOptions.sectionIds ?? null;
		this.attemptedBy = constructorOptions.attemptedBy;
		this.startedAt = constructorOptions.startedAt;
		this.durationLimit = constructorOptions.durationLimit;
		this.isStrict = constructorOptions.isStrict ?? false;
	}

	public equals(entity: AttemptConfig): boolean {
		return this.id === entity.id;
	}
}
