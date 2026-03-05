import { Command } from '@server/utils';

export class RemoveAnswerCommandPayload {
	constructor(
		public attemptId: string,
		public questionId: string,
		public answer?: string,
	) {}
}

export class RemoveAnswerCommand extends Command<RemoveAnswerCommandPayload> {}
