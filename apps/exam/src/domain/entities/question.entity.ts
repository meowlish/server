import { ExamStatus } from '../../enums/exam-status.enum';
import { QuestionType } from '../../enums/question-type.enum';
import {
	AnswerCreatedEvent,
	AnswerDeletedEvent,
	QuestionUpdatedEvent,
} from '../events/exam-management.event';
import { ExamId } from './exam.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate, IEntity } from '@server/utils';

export class Answer implements IEntity<Answer> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public isCorrect: boolean;
	public content: string;
	public displayContent: string | null;

	public constructor(constructorOptions: {
		id?: string;
		isCorrect?: boolean;
		content?: string;
		displayContent?: string | null;
	}) {
		this.id = constructorOptions.id ?? Answer.newId();
		this.isCorrect = constructorOptions.isCorrect ?? false;
		this.content = constructorOptions.content ?? '';
		this.displayContent = constructorOptions.displayContent ?? this.content;
	}
}

export class Question extends AggregateRoot<Event<any>> implements IAggregate<Question> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public readonly examId: ExamId;
	public readonly examStatus: ExamStatus;
	public sectionId: string;
	public content: string;
	public type: QuestionType;
	public points: number;
	public explanation: string;
	public answers: Answer[];

	public constructor(constructorOptions: {
		id: string;
		examId: ExamId;
		examStatus: ExamStatus;
		sectionId: string;
		content: string;
		type: QuestionType;
		points: number;
		explanation: string;
		answers: Answer[];
	}) {
		super();
		this.id = constructorOptions.id;
		this.examId = constructorOptions.examId;
		this.examStatus = constructorOptions.examStatus;
		this.sectionId = constructorOptions.sectionId;
		this.content = constructorOptions.content;
		this.type = constructorOptions.type;
		this.points = constructorOptions.points;
		this.explanation = constructorOptions.explanation;
		this.answers = constructorOptions.answers;
	}

	private assertModifiable(): void {
		if (this.examStatus === ExamStatus.APPROVED)
			throw new ConflictException('Exam is already approved and can no longer be updated.');
	}

	public updateDetails(options: {
		content?: string;
		explanation?: string;
		points?: number;
		type?: QuestionType;
	}): void {
		this.assertModifiable();
		if (options.content) this.content = options.content;
		if (options.explanation) this.explanation = options.explanation;
		if (options.points) this.points = options.points;
		if (options.type) this.type = options.type;
		this.apply(new QuestionUpdatedEvent({ parentId: this.sectionId, data: structuredClone(this) }));
	}

	public addAnswers(answer: Answer): void {
		this.assertModifiable();
		if (this.answers.some(a => a.id === answer.id))
			throw new ConflictException('Answer already exists');
		this.answers.push(answer);
		this.apply(new AnswerCreatedEvent({ questionId: this.id, data: structuredClone(answer) }));
	}

	public removeAnswer(answerOrAnswerId: string | Answer): void {
		this.assertModifiable();
		const id = answerOrAnswerId instanceof Answer ? answerOrAnswerId.id : answerOrAnswerId;
		const idx = this.answers.findIndex(a => a.id === id);
		if (idx === -1) throw new NotFoundException('Answer option not found');
		this.answers.splice(idx, 1);
		this.apply(new AnswerDeletedEvent({ answerId: id }));
	}
}

export type AnswerUpdatableProperties = Partial<Omit<Answer, 'id'>>;
export type QuestionUpdatableProperties = Partial<
	Pick<Question, 'content' | 'points' | 'explanation' | 'answers'>
>;
