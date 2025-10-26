import { Command } from '@common/abstract/command.class';

export class AuthMailRegisterCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class AuthMailRegisterCommand extends Command<AuthMailRegisterCommandPayload, string> {}
