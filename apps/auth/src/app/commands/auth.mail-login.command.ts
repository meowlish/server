import { Tokens } from '../../types/tokens.type';
import { Command } from '@server/utils';

export class MailLoginCommandPayload {
	constructor(
		public readonly mail: string,
		public readonly password: string,
	) {}
}

export class MailLoginCommand extends Command<MailLoginCommandPayload, Tokens> {}
