import { Command } from '@server/utils';

export class UpdateExamCommandPayload {
	public readonly id: string;
	public readonly title?: string;
	public readonly description?: string | null;
	public readonly duration?: number;
	public readonly addTags?: string[];
	public readonly removeTags?: string[];

	constructor(constructorOptions: {
		id: string;
		title?: string;
		setDescriptionNull?: boolean;
		description?: string;
		duration?: number;
		addTags?: string[];
		removeTags?: string[];
	}) {
		this.id = constructorOptions.id;
		this.title = constructorOptions.title;
		this.description = constructorOptions.description;
		if (constructorOptions.setDescriptionNull) this.description = null;
		this.duration = constructorOptions.duration;
		this.addTags = constructorOptions.addTags;
		this.removeTags = constructorOptions.removeTags;
	}
}

export class UpdateExamCommand extends Command<UpdateExamCommandPayload> {}
