import { Question } from '../entities/question.entity';

export interface IQuestionRepository {
	findOne(id: string): Promise<Question | null>;
	create(question: Question): Promise<void>;
	update(question: Question): Promise<void>;
	delete(id: string): Promise<void>;
}

export const IQuestionRepositoryToken = Symbol('IQuestionRepository');
