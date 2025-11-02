import { QuestionType } from '@core/exam/enums/question-type.enum';

import { IEntity } from '@common/abstract/entity/entity.interface';

import { Section } from './section.entity';

export class Answer implements IEntity<Answer> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public isCorrect: boolean;
	public content: string;

	constructor(constructorOptions: { id?: string; isCorrect?: boolean; content?: string }) {
		this.id = constructorOptions.id ?? Answer.newId();
		this.isCorrect = constructorOptions.isCorrect ?? false;
		this.content = constructorOptions.content ?? '';
	}

	public equals(entity: Answer): boolean {
		return this.id === entity.id;
	}
}

export class Question implements IEntity<Question> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public sectionId: string;
	public order: number;
	public content: string;
	public type: QuestionType;
	public points: number;
	public explanation: string;
	public answers: Answer[];

	constructor(constructorOptions: {
		id?: string;
		sectionId: string;
		order?: number;
		content?: string;
		type?: QuestionType;
		points?: number;
		explanation?: string;
		answers?: Answer[];
	}) {
		this.id = constructorOptions.id ?? Question.newId();
		this.sectionId = constructorOptions.sectionId;
		this.order = constructorOptions.order ?? 0;
		this.content = constructorOptions.content ?? '';
		this.type = constructorOptions.type ?? QuestionType.MCQ;
		this.points = constructorOptions.points ?? 1;
		this.explanation = constructorOptions.explanation ?? '';
		this.answers = constructorOptions.answers ?? [];
	}

	moveTo(section: Section): void {
		this.order = section.getNewChildOrderValue();
	}

	public equals(entity: Question): boolean {
		return this.id === entity.id;
	}
}
