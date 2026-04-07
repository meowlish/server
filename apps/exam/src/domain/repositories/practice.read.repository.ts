import { AttemptHistorySummary } from '../read-models/attempt-history-summary.read-model';
import { DetailedAttemptReviewData } from '../read-models/attempt-review,.read-model';
import { AttemptSavedData } from '../read-models/attempt-save-data.read-model';
import { DetailedExamInfo } from '../read-models/detailed-exam.read-model';
import { DetailedQuestionInfo } from '../read-models/detailed-question.read-model';
import { ExamStatistics } from '../read-models/exam-statistics.read-model';
import { MinimalAttemptInfo } from '../read-models/minimal-attempt.read-model';
import { MinimalExamInfo } from '../read-models/minimal-exam.read-model';
import { UserStats } from '../read-models/user-stats.read-model';
import { SortDirection } from '@server/typing';

export interface IPracticeReadRepository {
	getUserStats(uid: string): Promise<UserStats>;
	getUsersAttemptSummary(
		uid: string,
		range?: { from: Date; to: Date },
	): Promise<AttemptHistorySummary>;
	getUsersAttemptHistory(uid: string, examId?: string): Promise<MinimalAttemptInfo[]>;
	findExam(options?: {
		filter?: { name?: string; tags?: string[] };
		sortBy?: { key: 'attemptsCount' | 'updatedAt'; direction: SortDirection };
	}): Promise<MinimalExamInfo[]>;
	getExamDetail(examId: string): Promise<DetailedExamInfo>;
	getExamStats(examId: string): Promise<ExamStatistics>;
	getAttemptSavedData(attemptId: string): Promise<AttemptSavedData>;
	getAttemptReview(attemptId: string): Promise<DetailedAttemptReviewData>;
	getDetailedQuestionInfo(questionId: string): Promise<DetailedQuestionInfo>;
}

export const IPracticeReadRepositoryToken = Symbol('IPracticeReadRepository');
