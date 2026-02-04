import { ExamStatus } from '../../enums/exam-status.enum';
import { Exam } from '../entities/exam.entity';

export interface IExamRepository {
	findOne(id: string): Promise<Exam | null>;
	getStatus(id: string): Promise<ExamStatus | null>;
	// to enforce business rule: exam (and its sections, questions) cannot be updated if status is APPROVED
	getStatusBySectionId(id: string): Promise<ExamStatus | null>;
	getStatusByQuestionId(id: string): Promise<ExamStatus | null>;
	getParentExamOfSection(id: string): Promise<Exam>;
	create(exam: Exam): Promise<void>;
	update(exam: Exam): Promise<void>;
	delete(id: string): Promise<void>;
}

export const IExamRepositoryToken = Symbol('IExamRepository');
