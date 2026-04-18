import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { RemoveCredCommand } from '../auth.remove-cred.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveCredCommand)
export class RemoveCredCommandHandler implements ICommandHandler<RemoveCredCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	async execute(command: RemoveCredCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.deleteCredential(payload.id);
		await this.identityRepository.save(identity);
	}
}
