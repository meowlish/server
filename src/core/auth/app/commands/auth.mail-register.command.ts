import { Tokens } from '@core/auth/types/tokens.type';

import { Command } from '@common/abstract/command.class';

export class AuthMailRegisterCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly username: string,
		public readonly password: string,
	) {}
}

export class AuthMailRegisterCommand extends Command<AuthMailRegisterCommandPayload, Tokens> {}
