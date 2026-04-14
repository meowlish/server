import { Command } from '@server/utils';

export class DeleteQuestionCommandPayload {
	constructor(public readonly id: string) {}
}

export class DeleteQuestionCommand extends Command<DeleteQuestionCommandPayload> {}
