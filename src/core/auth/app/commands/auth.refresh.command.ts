import { Tokens } from '@core/auth/types/tokens.type';

import { Command } from '@common/abstract/command.class';

export class AuthRefreshCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class AuthRefreshCommand extends Command<AuthRefreshCommandPayload, Tokens> {}
