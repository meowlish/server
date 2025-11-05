import { Command } from '@common/abstract/command.class';

export class CreateExamCommandPayload {
	public readonly createdBy: string;
	public readonly title: string;
	public readonly description: string | null;
	public readonly duration: number;

	constructor(constructorOptions: {
		createdBy: string;
		title: string;
		description?: string;
		duration: number;
	}) {
		this.createdBy = constructorOptions.createdBy;
		this.title = constructorOptions.title;
		this.description = constructorOptions.description ?? null;
		this.duration = constructorOptions.duration;
	}
}

export class CreateExamCommand extends Command<CreateExamCommandPayload> {}
