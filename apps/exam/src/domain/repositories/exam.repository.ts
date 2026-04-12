import { Exam } from '../entities/exam.entity';

export interface IExamRepository {
	findOne(id: string): Promise<Exam | null>;
	// throw if section doesn't exist
	getParentExamOfSection(id: string): Promise<Exam>;
	save(exam: Exam): Promise<void>;
	delete(exam: Exam): Promise<void>;
}

export const IExamRepositoryToken = Symbol('IExamRepository');
