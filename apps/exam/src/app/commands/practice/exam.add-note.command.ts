import { Command } from '@server/utils';

export class AddNoteCommandPayload {
	constructor(
		public attemptId: string,
		public questionId: string,
		public note: string,
	) {}
}

export class AddNoteCommand extends Command<AddNoteCommandPayload> {}
