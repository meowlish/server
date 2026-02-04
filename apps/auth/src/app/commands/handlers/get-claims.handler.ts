import {
	type ICredentialRepository,
	ICredentialRepositoryToken,
} from '../../../domain/repositories/credential.repository';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { TokenService } from '../../services/token.service';
import { GetClaimsCommand } from '../auth.get-claims.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Claims } from '@server/utils';

@CommandHandler(GetClaimsCommand)
export class GetClaimsCommandHandler implements ICommandHandler<GetClaimsCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		@Inject(ICredentialRepositoryToken)
		private readonly credentialRepository: ICredentialRepository,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: GetClaimsCommand): Promise<Claims> {
		const payload = command.payload;
		const claims = await this.identityRepository.getClaimsOfId(payload.identityId);
		if (!claims) throw new UnauthorizedException();
		return { ...claims, sub: payload.identityId };
	}
}
