import { Claims, Command } from '@server/utils';

export class ValidateRefreshCommandPayload {
	constructor(
		public readonly identityId: string,
		public readonly iat: number,
	) {}
}

export class ValidateRefreshCommand extends Command<ValidateRefreshCommandPayload, Claims> {}
