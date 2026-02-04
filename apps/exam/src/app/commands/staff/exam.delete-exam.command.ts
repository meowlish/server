import { Command } from '@server/utils';

export class DeleteExamCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteExamCommand extends Command<DeleteExamCommandPayload> {}
