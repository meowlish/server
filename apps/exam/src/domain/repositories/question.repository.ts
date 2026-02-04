import { Question } from '../entities/question.entity';

export interface IQuestionRepository {
	findOne(id: string): Promise<Question | null>;
	update(question: Question): Promise<void>;
	delete(id: string): Promise<void>;
}

export const IQuestionRepositoryToken = Symbol('IQuestionRepository');
