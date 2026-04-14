import { Tokens } from '../../types/tokens.type';
import { Command } from '@server/utils';

export class RefreshCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class RefreshCommand extends Command<RefreshCommandPayload, Tokens> {}
