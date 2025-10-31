import { Command } from '@common/abstract/command.class';
import { Claims } from '@common/utils/types/claims.type';

export class AuthGetClaimsCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class AuthGetClaimsCommand extends Command<AuthGetClaimsCommandPayload, Claims> {}
