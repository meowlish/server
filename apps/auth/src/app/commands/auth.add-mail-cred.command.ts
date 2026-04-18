import { Command } from '@server/utils';

export class AddMailCredCommandPayload {
	constructor(
		public readonly identityId: string,
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class AddMailCredCommand extends Command<AddMailCredCommandPayload> {}
