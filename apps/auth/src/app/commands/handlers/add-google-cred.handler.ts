import { Credential } from '../../../domain/entities/credential.entity';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { LoginType } from '../../../enums/login-type.enum';
import { TokenService } from '../../services/token.service';
import { AddGoogleCredCommand } from '../auth.add-google-cred.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddGoogleCredCommand)
export class AddGoogleCredCommandHandler implements ICommandHandler<AddGoogleCredCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
		private readonly eventBus: EventBus,
		private readonly tokenService: TokenService,
	) {}

	public async execute(command: AddGoogleCredCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.addCredential(
			new Credential({ identifier: payload.identifier, loginType: LoginType.Google }),
		);
		await this.identityRepository.save(identity);
	}
}
