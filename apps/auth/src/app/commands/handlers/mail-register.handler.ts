import { Credential } from '../../../domain/entities/credential.entity';
import { Identity } from '../../../domain/entities/identity.entity';
import {
	type ICredentialRepository,
	ICredentialRepositoryToken,
} from '../../../domain/repositories/credential.repository';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { LoginType } from '../../../enums/login-type.enum';
import { Tokens } from '../../../types/tokens.type';
import { TokenService } from '../../services/token.service';
import { MailRegisterCommand } from '../auth.mail-register.command';
import { Transactional } from '@nestjs-cls/transactional';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MailRegisterCommand)
export class MailRegisterCommandHandler implements ICommandHandler<MailRegisterCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		@Inject(ICredentialRepositoryToken)
		private readonly credentialRepository: ICredentialRepository,
		private readonly tokenService: TokenService,
	) {}

	@Transactional()
	public async execute(command: MailRegisterCommand): Promise<Tokens> {
		const payload = command.payload;
		const identity = new Identity({ username: payload.username });
		await this.identityRepository.create(identity);
		const credential = new Credential({
			identifier: payload.mail,
			loginType: LoginType.MAIL,
			identityId: identity.id,
			secretHash: payload.password,
		});
		credential.hashSecret();
		await this.credentialRepository.create(credential);
		const claims = await this.identityRepository.getClaimsOfId(identity.id);
		return this.tokenService.generateTokens(
			{
				sub: identity.id,
				permissions: claims.permissions,
				roles: claims.roles,
			},
			true,
		);
	}
}
