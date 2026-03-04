import { AttemptConfig } from '../entities/attempt-config.entity';
import { AttemptEvaluator } from '../entities/attempt-evaluator.entity';
import { Attempt } from '../entities/attempt.entity';

export interface IAttemptRepository {
	findOne(id: string): Promise<Attempt | null>;
	save(attempt: Attempt | AttemptConfig | AttemptEvaluator): Promise<void>;
	deleteMany(ids: string[]): Promise<void>;
}

export const IAttemptRepositoryToken = Symbol('IAttemptRepository');
