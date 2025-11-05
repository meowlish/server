import { QuestionType } from '@core/exam/enums/question-type.enum';

import { Command } from '@common/abstract/command.class';

export class UpdateQuestionCommandPayload {
	public readonly id: string;
	public readonly content?: string;
	public readonly explanation?: string;
	public readonly points?: number;
	public readonly type?: QuestionType;
	public readonly addAnswers?: { content: string; isCorrect: boolean }[];
	public readonly deleteAnswers?: { content: string }[];

	constructor(constructorOptions: {
		id: string;
		content?: string;
		explanation?: string;
		points?: number;
		type?: QuestionType;
		addAnswers?: { content: string; isCorrect: boolean }[];
		deleteAnswers?: { content: string }[];
	}) {
		this.id = constructorOptions.id;
		this.content = constructorOptions.content;
		this.explanation = constructorOptions.explanation;
		this.points = constructorOptions.points;
		this.type = constructorOptions.type;
		this.addAnswers = constructorOptions.addAnswers;
		this.deleteAnswers = constructorOptions.deleteAnswers;
	}
}

export class UpdateQuestionCommand extends Command<UpdateQuestionCommandPayload> {}
