import { Command } from '@server/utils';

export class MoveQuestionCommandPayload {
	public readonly id: string;
	public readonly index?: number;
	public readonly sectionId?: string;

	constructor(constructorOptions: { id: string; index?: number; sectionId?: string }) {
		this.id = constructorOptions.id;
		this.index = constructorOptions.index ?? -1;
		this.sectionId = constructorOptions.sectionId;
	}
}

export class MoveQuestionCommand extends Command<MoveQuestionCommandPayload> {}
