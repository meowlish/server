import { ExamStatus } from '../../enums/exam-status.enum';
import {
	type ExamId,
	type ExamSection,
	type ExamSectionUpdatableProperties,
	type ExamUpdatableProperties,
} from '../entities/exam.entity';
import {
	type Answer,
	type AnswerUpdatableProperties,
	type QuestionUpdatableProperties,
} from '../entities/question.entity';
import {
	type SectionChild,
	type SectionChildUpdatableProperties,
	type SectionUpdatableProperties,
} from '../entities/section.entity';
import { Event } from '@server/utils';

// notification events
// exam
export class ExamDetailsUpdatedEvent extends Event<{
	examId: ExamId;
	data: ExamUpdatableProperties;
}> {}
export class ExamStatusUpdatedEvent extends Event<{ examId: ExamId; status: ExamStatus }> {}
export class ExamDeletedEvent extends Event<{ examId: ExamId }> {}
// section
export class SectionUpdatedEvent extends Event<{
	examId: ExamId;
	sectionId: string;
	details: SectionUpdatableProperties;
}> {}
// question
export class QuestionUpdatedEvent extends Event<{
	parentId: string;
	data: QuestionUpdatableProperties;
}> {}

// change tracking events
// exam, section aggregate
export class SectionCreatedEvent extends Event<{
	examId: ExamId;
	parentId?: string;
	data: ExamSection;
}> {}
export class SectionDeletedEvent extends Event<{ sectionId: string }> {}
export class SectionMovedEvent extends Event<{
	examId: ExamId;
	parentId?: string;
	sectionId: string;
	data: ExamSectionUpdatableProperties;
}> {}
// section aggregate
export class QuestionCreatedEvent extends Event<{ sectionId: string; data: SectionChild }> {}
export class QuestionDeletedEvent extends Event<{ questionId: string }> {}
export class QuestionMovedEvent extends Event<{
	sectionId: string;
	questionId: string;
	data: SectionChildUpdatableProperties;
}> {}
// question aggregate
export class AnswerCreatedEvent extends Event<{ questionId: string; data: Answer }> {}
export class AnswerDeletedEvent extends Event<{ answerId: string }> {}
export class AnswerUpdatedEvent extends Event<{
	questionId: string;
	answerId: string;
	data: AnswerUpdatableProperties;
}> {}
