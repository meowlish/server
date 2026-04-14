import { Command } from '@server/utils';

export class DeleteSectionCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteSectionCommand extends Command<DeleteSectionCommandPayload> {}
