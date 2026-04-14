import { Question } from '../entities/question.entity';

export interface IQuestionRepository {
	findOne(id: string): Promise<Question | null>;
	save(question: Question): Promise<void>;
}

export const IQuestionRepositoryToken = Symbol('IQuestionRepository');
