import { QuestionType } from '../../../enums/question-type.enum';
import { Command } from '@server/utils';

export class UpdateQuestionCommandPayload {
	public readonly id: string;
	public readonly content?: string;
	public readonly explanation?: string;
	public readonly points?: number;
	public readonly type?: QuestionType;
	public readonly addAnswers?: { content: string; isCorrect: boolean }[];
	public readonly deleteAnswersIds?: string[];

	constructor(constructorOptions: {
		id: string;
		content?: string;
		explanation?: string;
		points?: number;
		type?: QuestionType;
		addAnswers?: { content: string; isCorrect: boolean }[];
		deleteAnswersIds?: string[];
	}) {
		this.id = constructorOptions.id;
		this.content = constructorOptions.content;
		this.explanation = constructorOptions.explanation;
		this.points = constructorOptions.points;
		this.type = constructorOptions.type;
		this.addAnswers = constructorOptions.addAnswers;
		this.deleteAnswersIds = constructorOptions.deleteAnswersIds;
	}
}

export class UpdateQuestionCommand extends Command<UpdateQuestionCommandPayload> {}
