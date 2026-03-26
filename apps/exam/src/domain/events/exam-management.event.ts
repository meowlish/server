import { ExamStatus } from '../../enums/exam-status.enum';
import { type Exam, type ExamId, type ExamSection } from '../entities/exam.entity';
import { type Choice, type Question } from '../entities/question.entity';
import { type Section, type SectionChild } from '../entities/section.entity';
import { Event } from '@server/utils';

// notification events
// exam
export class ExamDetailsUpdatedEvent extends Event<{
	examId: ExamId;
	data: Exam;
}> {}
export class ExamStatusUpdatedEvent extends Event<{ examId: ExamId; status: ExamStatus }> {}
export class ExamDeletedEvent extends Event<{ examId: ExamId }> {}
// section
export class SectionUpdatedEvent extends Event<{
	examId: ExamId;
	sectionId: string;
	details: Section;
}> {}
// question
export class QuestionUpdatedEvent extends Event<{
	parentId: string;
	data: Question;
}> {}

// change tracking events
// exam, section aggregate
export class SectionCreatedEvent extends Event<{
	examId: ExamId;
	data: ExamSection;
}> {}
export class ChildSectionCreatedEvent extends Event<{
	examId: ExamId;
	parentId: string;
	data: ExamSection;
}> {}
export class SectionDeletedEvent extends Event<{ sectionId: string }> {}
export class SectionMovedEvent extends Event<{
	examId: ExamId;
	sectionId: string;
	data: ExamSection;
}> {}
export class ChildSectionMovedEvent extends Event<{
	examId: ExamId;
	parentId: string;
	sectionId: string;
	data: ExamSection;
}> {}
// section aggregate
export class QuestionCreatedEvent extends Event<{ sectionId: string; data: SectionChild }> {}
export class QuestionDeletedEvent extends Event<{ questionId: string }> {}
export class QuestionMovedEvent extends Event<{
	sectionId: string;
	questionId: string;
	data: SectionChild;
}> {}
// question aggregate
export class ChoiceCreatedEvent extends Event<{ questionId: string; data: Choice }> {}
export class ChoiceDeletedEvent extends Event<{ choiceId: string }> {}
export class ChoiceUpdatedEvent extends Event<{
	questionId: string;
	choiceId: string;
	data: Choice;
}> {}
// tags
export class ExamTagAdded extends Event<{ examId: string; tag: string }> {}
export class SectionTagAdded extends Event<{ sectionId: string; tag: string }> {}
export class QuestionTagAdded extends Event<{ questionId: string; tag: string }> {}
export class ExamTagRemoved extends Event<{ examId: string; tag: string }> {}
export class SectionTagRemoved extends Event<{ sectionId: string; tag: string }> {}
export class QuestionTagRemoved extends Event<{ questionId: string; tag: string }> {}
// files
export class SectionFileAdded extends Event<{ sectionId: string; fileId: string }> {}
export class QuestionFileAdded extends Event<{ questionId: string; fileId: string }> {}
export class SectionFileRemoved extends Event<{ sectionId: string; fileId: string }> {}
export class QuestionFileRemoved extends Event<{ questionId: string; fileId: string }> {}
