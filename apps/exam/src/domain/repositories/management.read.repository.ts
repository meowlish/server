import { ExamStatus } from '../../enums/exam-status.enum';
import {
	ExamManagementDetailedInfo,
	ExamManagementMinimalInfo,
} from '../read-models/management/exam-info.read-model';
import { QuestionManagementInfo } from '../read-models/management/question-info.read-model';
import { SectionManagementInfo } from '../read-models/management/section-info.read-model';
import { SortDirection } from '@server/typing';

export interface IManagementReadRepository {
	findExams(options?: {
		filter?: {
			title?: string;
			createdBy?: string;
			status?: ExamStatus;
			createdTimeRange?: { from: Date; to: Date };
			updatedTimeRange?: { from: Date; to: Date };
		};
		sortBy?: { key: 'updatedAt' | 'createdAt'; direction: SortDirection };
		lastId?: string;
		limit?: number;
	}): Promise<ExamManagementMinimalInfo[]>;
	getExamDetail(examId: string): Promise<ExamManagementDetailedInfo | null>;
	getSectionDetail(sectionId: string): Promise<SectionManagementInfo | null>;
	getQuestionDetail(questionId: string): Promise<QuestionManagementInfo | null>;
}

export const IManagementReadRepositoryToken = Symbol('IManagementReadRepository');
