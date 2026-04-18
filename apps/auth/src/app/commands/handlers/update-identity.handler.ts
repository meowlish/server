import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { UpdateIdentityCommand } from '../auth.update-identity.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateIdentityCommand)
export class UpdateIdentityCommandHandler implements ICommandHandler<UpdateIdentityCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	public async execute(command: UpdateIdentityCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.updateDetails({ username: payload.username });
		await this.identityRepository.save(identity);
	}
}
