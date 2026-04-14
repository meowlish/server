import { AttemptConfig } from '../entities/attempt-config.entity';
import { AttemptEvaluator } from '../entities/attempt-evaluator.entity';
import { Attempt } from '../entities/attempt.entity';

export interface IAttemptRepository {
	findOne(id: string): Promise<Attempt | null>;
	getAttemptedUser(attemptId: string): Promise<string | null>;
	getScoreEvaluator(attemptId: string): Promise<AttemptEvaluator | null>;
	save(attempt: Attempt | AttemptConfig | AttemptEvaluator): Promise<void>;
	deleteMany(ids: string[]): Promise<void>;
	// for AI
	getWritingResponse(
		responseOrAttemptId: string,
		questionId?: string,
	): Promise<{
		attemptedBy: string;
		examId: string;
		examTags: string[];
		questionContent: string;
		questionTags: string[];
		answer?: string[];
	} | null>;
	saveComment(responseId: string, comment: unknown): Promise<void>;
}

export const IAttemptRepositoryToken = Symbol('IAttemptRepository');
