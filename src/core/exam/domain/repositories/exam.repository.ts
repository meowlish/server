import { Exam } from '../entities/exam.entity';

export interface IExamRepository {
	findOne(id: string): Promise<Exam | null>;
	create(exam: Exam): Promise<void>;
	update(exam: Exam): Promise<void>;
	delete(id: string): Promise<void>;
}

export const IExamRepositoryToken = Symbol('IExamRepository');
