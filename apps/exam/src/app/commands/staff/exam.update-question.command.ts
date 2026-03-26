import { QuestionType } from '../../../enums/question-type.enum';
import { Command } from '@server/utils';

export class UpdateQuestionCommandPayload {
	public readonly id: string;
	public readonly content?: string;
	public readonly explanation?: string;
	public readonly points?: number;
	public readonly type?: QuestionType;
	public readonly addChoices?: { key: string; content?: string; isCorrect: boolean }[];
	public readonly deleteChoicesIds?: string[];
	public readonly updateChoices?: {
		id: string;
		key?: string;
		content?: string | null;
		isCorrect?: boolean;
	}[];
	public readonly addTags?: string[];
	public readonly removeTags?: string[];
	public readonly addFiles?: string[];
	public readonly removeFiles?: string[];

	constructor(constructorOptions: {
		id: string;
		content?: string;
		explanation?: string;
		points?: number;
		type?: QuestionType;
		addChoices?: { key: string; content?: string; isCorrect: boolean }[];
		deleteChoicesIds?: string[];
		updateChoices?: {
			id: string;
			key?: string;
			content?: string;
			setContentNull?: boolean;
			isCorrect?: boolean;
		}[];
		addTags?: string[];
		removeTags?: string[];
		addFiles?: string[];
		removeFiles?: string[];
	}) {
		this.id = constructorOptions.id;
		this.content = constructorOptions.content;
		this.explanation = constructorOptions.explanation;
		this.points = constructorOptions.points;
		this.type = constructorOptions.type;
		this.addChoices = constructorOptions.addChoices;
		this.deleteChoicesIds = constructorOptions.deleteChoicesIds;
		this.updateChoices = constructorOptions.updateChoices?.map(c => ({
			...c,
			content: c.setContentNull ? null : c.content,
		}));
		this.addTags = constructorOptions.addTags;
		this.removeTags = constructorOptions.removeTags;
		this.addFiles = constructorOptions.addFiles;
		this.removeFiles = constructorOptions.removeFiles;
	}
}

export class UpdateQuestionCommand extends Command<UpdateQuestionCommandPayload> {}
