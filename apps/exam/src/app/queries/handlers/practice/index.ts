import { FindExamsHandler } from './find-exams.handler';
import { GetUsersAttemptHistoryHandler } from './get-users-attempt-history.handler';

export const ExamPracticeQueryHandler = [FindExamsHandler, GetUsersAttemptHistoryHandler];
