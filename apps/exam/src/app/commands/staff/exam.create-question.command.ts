import { Command } from '@server/utils';

export class CreateQuestionCommandPayload {
	constructor(
		public readonly sectionId: string,
		public readonly index = -1,
	) {}
}

export type CreateQuestionCommandResult = {
	id: string;
};

export class CreateQuestionCommand extends Command<
	CreateQuestionCommandPayload,
	CreateQuestionCommandResult
> {}
