import {
	type ICredentialRepository,
	ICredentialRepositoryToken,
} from '@core/auth/domain/repositories/credential.repository';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '@core/auth/domain/repositories/identity.repository';
import { LoginType } from '@core/auth/enums/login-type.enum';
import { Tokens } from '@core/auth/types/tokens.type';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '../../services/token.service';
import { MailLoginCommand } from '../auth.mail-login.command';

@CommandHandler(MailLoginCommand)
export class MailLoginCommandHandler implements ICommandHandler<MailLoginCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		@Inject(ICredentialRepositoryToken)
		private readonly credentialRepository: ICredentialRepository,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: MailLoginCommand): Promise<Tokens> {
		const payload = command.payload;
		const credential = await this.credentialRepository.findOne(payload.mail, LoginType.MAIL);
		if (!credential) throw new UnauthorizedException("Mail doesn't exist");
		if (!credential.compareHash(payload.password))
			throw new UnauthorizedException('Wrong password');
		const claims = await this.identityRepository.getClaimsOfId(credential.identityId);
		if (!claims) throw new UnauthorizedException();
		return this.tokenService.generateTokens(
			{
				sub: credential.identityId,
				permission: claims.permissions,
				roles: claims.roles,
			},
			true,
		);
	}
}
