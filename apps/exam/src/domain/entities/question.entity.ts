import { QuestionType } from '../../enums/question-type.enum';
import { ConflictException } from '@nestjs/common';
import { IEntity } from '@server/utils';
import { IValueObject } from '@server/utils';
import { Action } from '@server/utils';

export class Answer implements IValueObject<Answer> {
	public action: Action = Action.READ;
	public isCorrect: boolean;
	public content: string;

	constructor(constructorOptions: { isCorrect?: boolean; content?: string }) {
		this.isCorrect = constructorOptions.isCorrect ?? false;
		this.content = constructorOptions.content ?? '';
	}

	public equals(entity: Answer): boolean {
		return (
			this.content === entity.content ||
			(this.content === entity.content && this.isCorrect === entity.isCorrect)
		);
	}
}

export class Question implements IEntity<Question> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public sectionId: string;
	public content: string;
	public type: QuestionType;
	public points: number;
	public explanation: string;
	public answers: Answer[];

	constructor(constructorOptions: {
		id?: string;
		sectionId: string;
		content?: string;
		type?: QuestionType;
		points?: number;
		explanation?: string;
		answers?: Answer[];
	}) {
		this.id = constructorOptions.id ?? Question.newId();
		this.sectionId = constructorOptions.sectionId;
		this.content = constructorOptions.content ?? '';
		this.type = constructorOptions.type ?? QuestionType.MCQ;
		this.points = constructorOptions.points ?? 1;
		this.explanation = constructorOptions.explanation ?? '';
		this.answers = constructorOptions.answers ?? [];
	}

	updateDetails(options: {
		content?: string;
		explanation?: string;
		points?: number;
		type?: QuestionType;
	}): void {
		if (options.content) this.content = options.content;
		if (options.explanation) this.explanation = options.explanation;
		if (options.points) this.points = options.points;
		if (options.type) this.type = options.type;
	}

	addAnswers(answer: Answer) {
		if (this.answers.some(a => a.equals(answer)))
			throw new ConflictException('Answer already exists');
		answer.action = Action.CREATE;
		this.answers.push(answer);
	}

	removeAnswer(answer: string | Answer) {
		const answerPos =
			answer instanceof Answer ?
				this.answers.findIndex(a => a.equals(answer))
			:	this.answers.findIndex(a => a.content === answer);
		if (answerPos !== -1) {
			this.answers[answerPos].action = Action.DELETE;
		}
	}

	public equals(entity: Question): boolean {
		return this.id === entity.id;
	}
}
