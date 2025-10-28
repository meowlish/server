import { Credential } from '@core/auth/domain/entities/credential.entity';
import { Identity } from '@core/auth/domain/entities/identity.entity';
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
import { Transactional } from '@nestjs-cls/transactional';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '../../services/token.service';
import { AuthMailRegisterCommand } from '../auth.mail-register.command';

@CommandHandler(AuthMailRegisterCommand)
export class AuthMailRegisterCommandHandler implements ICommandHandler<AuthMailRegisterCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		@Inject(ICredentialRepositoryToken)
		private readonly credentialRepository: ICredentialRepository,
		private readonly tokenService: TokenService,
	) {}

	@Transactional()
	public async execute(command: AuthMailRegisterCommand): Promise<Tokens> {
		const payload = command.payload;
		const identity = await this.identityRepository.create(new Identity(payload.username));
		const credential = new Credential(payload.mail, LoginType.MAIL, identity.id, {
			secretHash: payload.password,
		});
		credential.hashSecret();
		await this.credentialRepository.create(credential);
		return this.tokenService.generateTokens({ sub: '123', jti: '123', permission: [], roles: [] });
	}
}
