import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { AssignRoleToCommand } from '../auth.assign-role-to.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AssignRoleToCommand)
export class AssignRoleToCommandHandler implements ICommandHandler<AssignRoleToCommand> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	public async execute(command: AssignRoleToCommand): Promise<void> {
		const payload = command.payload;
		const identity = await this.identityRepository.findOneById(payload.identityId);
		if (!identity) throw new NotFoundException('Identity not found');
		identity.addRole(payload.roleId);
		await this.identityRepository.save(identity);
	}
}
