import { Command } from '@common/abstract/command.class';

export class DeleteExamCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteExamCommand extends Command<DeleteExamCommandPayload> {}
