import { CreateExamHandler } from './staff/create-exam.handler';
import { CreateQuestionHandler } from './staff/create-question.handler';
import { CreateSectionHandler } from './staff/create-section.handler';
import { DeleteExamHandler } from './staff/delete-exam.handler';
import { DeleteQuestionHandler } from './staff/delete-question.handler';
import { DeleteSectionHandler } from './staff/delete-section.handler';

export const ExamHandlers = [
	CreateExamHandler,
	CreateQuestionHandler,
	CreateSectionHandler,
	DeleteExamHandler,
	DeleteQuestionHandler,
	DeleteSectionHandler,
];
