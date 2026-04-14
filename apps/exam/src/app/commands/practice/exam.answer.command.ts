import { Command } from '@server/utils';

export class AnswerCommandPayload {
	constructor(
		public attemptId: string,
		public questionId: string,
		public answer: string,
	) {}
}

export class AnswerCommand extends Command<AnswerCommandPayload> {}
