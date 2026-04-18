import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { RemoveRoleFromCommand } from '../auth.remove-role-from.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveRoleFromCommand)
export class RemoveRoleFromCommandHandler implements ICommandHandler<RemoveRoleFromCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	public async execute(command: RemoveRoleFromCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.removeRole(payload.roleId);
		await this.identityRepository.save(identity);
	}
}
