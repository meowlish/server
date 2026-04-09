import { FindExamsHandler } from './find-exams.handler';
import { GetAttemptDataQueryHandler } from './get-attempt-data.handler';
import { GetAttemptReviewQueryHandler } from './get-attempt-review.handler';
import { GetExamDetailsQueryHandler } from './get-exam-details.handler';
import { GetExamStatsQueryHandler } from './get-exam-stats.handler';
import { GetQuestionDetailsQueryHandler } from './get-question-details.handler';
import { GetUserCalendarQueryHandler } from './get-user-calendar.handler';
import { GetUserStatsQueryHandler } from './get-user-stats.handler';
import { GetUsersAttemptHistoryHandler } from './get-users-attempt-history.handler';

export const ExamPracticeQueryHandler = [
	FindExamsHandler,
	GetAttemptDataQueryHandler,
	GetAttemptReviewQueryHandler,
	GetExamDetailsQueryHandler,
	GetExamStatsQueryHandler,
	GetQuestionDetailsQueryHandler,
	GetUserCalendarQueryHandler,
	GetUserStatsQueryHandler,
	GetUsersAttemptHistoryHandler,
];
