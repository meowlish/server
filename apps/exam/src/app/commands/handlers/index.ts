import { AddNoteHandler } from './practice/add-note.handler';
import { AnswerHandler } from './practice/answer.handler';
import { AttemptHandler } from './practice/attempt.handler';
import { EndAttemptHandler } from './practice/end-attempt.handler';
import { RemoveAnswerHandler } from './practice/remove-answer.handler';
import { ToggleFlagHandler } from './practice/toggle-flag.handler';
import { CreateExamHandler } from './staff/create-exam.handler';
import { CreateQuestionHandler } from './staff/create-question.handler';
import { CreateSectionHandler } from './staff/create-section.handler';
import { DeleteExamHandler } from './staff/delete-exam.handler';
import { DeleteQuestionHandler } from './staff/delete-question.handler';
import { DeleteSectionHandler } from './staff/delete-section.handler';
import { MoveQuestionHandler } from './staff/move-question.handler';
import { MoveSectionHandler } from './staff/move-section.handler';
import { ReviewExamHandler } from './staff/review-exam.handler';
import { UpdateExamHandler } from './staff/update-exam.handler';
import { UpdateQuestionHandler } from './staff/update-question.handler';
import { UpdateSectionHandler } from './staff/update-section.handler';

export const ExamManagementHandlers = [
	CreateExamHandler,
	CreateQuestionHandler,
	CreateSectionHandler,
	DeleteExamHandler,
	DeleteQuestionHandler,
	DeleteSectionHandler,
	MoveQuestionHandler,
	MoveSectionHandler,
	UpdateExamHandler,
	UpdateSectionHandler,
	UpdateQuestionHandler,
	ReviewExamHandler,
];

export const ExamPracticeHandlers = [
	AnswerHandler,
	RemoveAnswerHandler,
	AddNoteHandler,
	ToggleFlagHandler,
	AttemptHandler,
	EndAttemptHandler,
];
