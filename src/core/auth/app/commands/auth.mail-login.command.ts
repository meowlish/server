import { Tokens } from '@core/auth/types/tokens.type';

import { Command } from '@common/abstract/command.class';

export class MailLoginCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class MailLoginCommand extends Command<MailLoginCommandPayload, Tokens> {}
