import { Command } from '@common/abstract/command.class';

export class DeleteSectionCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteSectionCommand extends Command<DeleteSectionCommandPayload> {}
