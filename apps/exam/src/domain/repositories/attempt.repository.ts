import { AttemptConfig } from '../entities/attempt-config.entity';
import { Attempt } from '../entities/attempt.entity';

export interface IAttemptRepository {
	findOne(id: string): Promise<Attempt | null>;
	save(attempt: Attempt | AttemptConfig): Promise<void>;
}

export const IAttemptRepositoryToken = Symbol('IAttemptRepository');
