import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '@core/auth/domain/repositories/identity.repository';
import { Tokens } from '@core/auth/types/tokens.type';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '../../services/token.service';
import { AuthRefreshCommand } from '../auth.refresh.command';

@CommandHandler(AuthRefreshCommand)
export class AuthRefreshCommandHandler implements ICommandHandler<AuthRefreshCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: AuthRefreshCommand): Promise<Tokens> {
		const payload = command.payload;
		const claims = await this.identityRepository.getClaimsOfId(payload.identityId);
		if (!claims) throw new UnauthorizedException();
		return this.tokenService.generateTokens(
			{
				sub: payload.identityId,
				permission: claims.permissions,
				roles: claims.roles,
			},
			true,
		);
	}
}
