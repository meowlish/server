import { Command } from '@common/abstract/command.class';

export class DeleteQuestionCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteQuestionCommand extends Command<DeleteQuestionCommandPayload> {}
