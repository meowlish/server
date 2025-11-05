import { Command } from '@common/abstract/command.class';

export class UpdateExamCommandPayload {
	public readonly id: string;
	public readonly title?: string;
	public readonly setDescriptionNull?: boolean;
	public readonly description?: string;
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
		this.setDescriptionNull = constructorOptions.setDescriptionNull;
		this.description = constructorOptions.description;
		this.duration = constructorOptions.duration;
	}
}

export class UpdateExamCommand extends Command<UpdateExamCommandPayload> {}
