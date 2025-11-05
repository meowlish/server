import { Command } from '@common/abstract/command.class';

export class CreateQuestionCommandPayload {
	constructor(
		public readonly sectionId: string,
		public readonly index: number = -1,
	) {}
}

export class CreateQuestionCommand extends Command<CreateQuestionCommandPayload> {}
