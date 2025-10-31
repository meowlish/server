import {
	type ICredentialRepository,
	ICredentialRepositoryToken,
} from '@core/auth/domain/repositories/credential.repository';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '@core/auth/domain/repositories/identity.repository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Claims } from '@common/utils/types/claims.type';

import { TokenService } from '../../services/token.service';
import { AuthGetClaimsCommand } from '../auth.get-claims.command';

@CommandHandler(AuthGetClaimsCommand)
export class AuthGetClaimsCommandHandler implements ICommandHandler<AuthGetClaimsCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		@Inject(ICredentialRepositoryToken)
		private readonly credentialRepository: ICredentialRepository,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: AuthGetClaimsCommand): Promise<Claims> {
		const payload = command.payload;
		const claims = await this.identityRepository.getClaimsOfId(payload.identityId);
		if (!claims) throw new UnauthorizedException();
		return { ...claims, sub: payload.identityId };
	}
}
