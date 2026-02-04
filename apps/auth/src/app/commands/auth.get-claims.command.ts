import { Claims, Command } from '@server/utils';

export class GetClaimsCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class GetClaimsCommand extends Command<GetClaimsCommandPayload, Claims> {}
