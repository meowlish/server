import { ExamStatus } from '../../enums/exam-status.enum';
import { QuestionType, questionTypesWithOnlyOneAnswer } from '../../enums/question-type.enum';
import {
	ChoiceCreatedEvent,
	ChoiceDeletedEvent,
	ChoiceUpdatedEvent,
	QuestionUpdatedEvent,
} from '../events/exam-management.event';
import { ExamId } from './exam.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate, IEntity } from '@server/utils';

export class Choice implements IEntity<Choice> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public isCorrect: boolean;
	public key: string;
	public content: string | null;

	public constructor(constructorOptions: {
		id?: string;
		isCorrect?: boolean;
		key?: string;
		content?: string | null;
	}) {
		this.id = constructorOptions.id ?? Choice.newId();
		this.isCorrect = constructorOptions.isCorrect ?? false;
		this.key = constructorOptions.key ?? '';
		this.content = constructorOptions.content ?? null;
	}

	public updateDetails(options: ChoiceUpdatableProperties) {
		if (options.content || options.content === null) this.content = options.content;
		if (options.isCorrect) this.isCorrect = options.isCorrect;
		if (options.key) this.key = options.key;
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
	public choices: Choice[];

	public constructor(constructorOptions: {
		id: string;
		examId: ExamId;
		examStatus: ExamStatus;
		sectionId: string;
		content: string;
		type: QuestionType;
		points: number;
		explanation: string;
		choices: Choice[];
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
		this.choices = constructorOptions.choices;
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

	public addChoice(choice: Choice): void {
		this.assertModifiable();
		if (this.choices.some(c => c.id === choice.id))
			throw new ConflictException('Choice already exists');
		if (
			choice.isCorrect &&
			questionTypesWithOnlyOneAnswer.includes(this.type) &&
			this.choices.find(c => c.isCorrect)
		)
			throw new ConflictException('This type of question only allows one correct choice');
		if (this.choices.find(c => c.key === choice.key))
			throw new ConflictException('Choice must not have duplicate key');
		this.choices.push(choice);
		this.apply(new ChoiceCreatedEvent({ questionId: this.id, data: structuredClone(choice) }));
	}

	public removeChoice(choiceOrChoiceId: string | Choice): void {
		this.assertModifiable();
		const choiceId = choiceOrChoiceId instanceof Choice ? choiceOrChoiceId.id : choiceOrChoiceId;
		const idx = this.choices.findIndex(c => c.id === choiceId);
		if (idx === -1) throw new NotFoundException('Choice not found');
		this.choices.splice(idx, 1);
		this.apply(new ChoiceDeletedEvent({ choiceId: choiceId }));
	}

	public updateChoice(choiceId: string, options: ChoiceUpdatableProperties) {
		this.assertModifiable();
		const choice = this.choices.find(c => c.id === choiceId);
		if (!choice) throw new NotFoundException('Choice not found');
		choice.updateDetails(options);
		this.apply(
			new ChoiceUpdatedEvent({
				questionId: this.id,
				choiceId: choiceId,
				data: structuredClone(choice),
			}),
		);
	}
}

export type ChoiceUpdatableProperties = Partial<Pick<Choice, 'content' | 'isCorrect' | 'key'>>;
export type QuestionUpdatableProperties = Partial<
	Pick<Question, 'content' | 'points' | 'explanation' | 'choices'>
>;
