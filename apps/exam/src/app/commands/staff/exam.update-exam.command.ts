import { Command } from '@server/utils';

export class UpdateExamCommandPayload {
	public readonly id: string;
	public readonly title?: string;
	public readonly description?: string | null;
	public readonly duration?: number;

	constructor(constructorOptions: {
		id: string;
		title?: string;
		setDescriptionNull?: boolean;
		description?: string;
		duration?: number;
	}) {
		this.id = constructorOptions.id;
		this.title = constructorOptions.title;
		this.description = constructorOptions.description;
		if (constructorOptions.setDescriptionNull) this.description = null;
		this.duration = constructorOptions.duration;
	}
}

export class UpdateExamCommand extends Command<UpdateExamCommandPayload> {}
