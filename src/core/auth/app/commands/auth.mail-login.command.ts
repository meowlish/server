import { Tokens } from '@core/auth/types/tokens.type';

import { Command } from '@common/abstract/command.class';

export class AuthMailLoginCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class AuthMailLoginCommand extends Command<AuthMailLoginCommandPayload, Tokens> {}
