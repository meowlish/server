import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { UpdatePasswordCommand } from '../auth.update-password.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler implements ICommandHandler<UpdatePasswordCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	public async execute(command: UpdatePasswordCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.updateCredential(payload.id, { secretHash: payload.password });
		await this.identityRepository.save(identity);
	}
}
