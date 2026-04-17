import { Command } from '@server/utils';

export class AddGoogleCredCommandPayload {
	constructor(
		public readonly identityId: string,
		public readonly identifier: string,
	) {}
}

export class AddGoogleCredCommand extends Command<AddGoogleCredCommandPayload> {}
