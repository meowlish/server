import { Command } from '@common/abstract/command.class';

export class AuthLoginCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class AuthLoginCommand extends Command<AuthLoginCommandPayload> {}
