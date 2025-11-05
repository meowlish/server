import { Command } from '@common/abstract/command.class';
import { Claims } from '@common/utils/types/claims.type';

export class GetClaimsCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class GetClaimsCommand extends Command<GetClaimsCommandPayload, Claims> {}
