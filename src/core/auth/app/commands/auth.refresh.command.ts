import { Tokens } from '@core/auth/types/tokens.type';

import { Command } from '@common/abstract/command.class';

export class RefreshCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class RefreshCommand extends Command<RefreshCommandPayload, Tokens> {}
