import { Command } from '@common/abstract/command.class';

export class MoveSectionCommandPayload {
	public readonly id: string;
	public readonly index?: number;
	public readonly parentId?: string;
	public readonly toRoot?: boolean;

	constructor(constructorOptions: {
		id: string;
		index?: number;
		sectionId?: string;
		toRoot?: boolean;
	}) {
		this.id = constructorOptions.id;
		this.index = constructorOptions.index ?? -1;
		this.parentId = constructorOptions.sectionId;
		this.toRoot = constructorOptions.toRoot;
	}
}

export class MoveSectionCommand extends Command<MoveSectionCommandPayload> {}
