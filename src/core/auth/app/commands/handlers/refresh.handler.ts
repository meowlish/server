import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '@core/auth/domain/repositories/identity.repository';
import { Tokens } from '@core/auth/types/tokens.type';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '../../services/token.service';
import { RefreshCommand } from '../auth.refresh.command';

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<RefreshCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: RefreshCommand): Promise<Tokens> {
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
