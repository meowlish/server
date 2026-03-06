import { CreateExamHandler } from './management/create-exam.handler';
import { CreateQuestionHandler } from './management/create-question.handler';
import { CreateSectionHandler } from './management/create-section.handler';
import { DeleteExamHandler } from './management/delete-exam.handler';
import { DeleteQuestionHandler } from './management/delete-question.handler';
import { DeleteSectionHandler } from './management/delete-section.handler';
import { MoveQuestionHandler } from './management/move-question.handler';
import { MoveSectionHandler } from './management/move-section.handler';
import { ReviewExamHandler } from './management/review-exam.handler';
import { UpdateExamHandler } from './management/update-exam.handler';
import { UpdateQuestionHandler } from './management/update-question.handler';
import { UpdateSectionHandler } from './management/update-section.handler';
import { AddNoteHandler } from './practice/add-note.handler';
import { AnswerHandler } from './practice/answer.handler';
import { AttemptHandler } from './practice/attempt.handler';
import { EndAttemptHandler } from './practice/end-attempt.handler';
import { RemoveAnswerHandler } from './practice/remove-answer.handler';
import { ToggleFlagHandler } from './practice/toggle-flag.handler';

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
