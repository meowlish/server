import { Tokens } from '../../types/tokens.type';
import { Command } from '@server/utils';

export class GoogleRegisterOrLoginCommandPayload {
	constructor(
		public readonly identifier: string,
		public readonly username: string,
	) {}
}

export class GoogleRegisterOrLoginCommand extends Command<
	GoogleRegisterOrLoginCommandPayload,
	Tokens
> {}
