import { RoleReadModel } from '../../../domain/entities/role.read-model';
import {
	type IRoleReadRepository,
	IRoleReadRepositoryToken,
} from '../../../domain/repositories/role.read.repository';
import { GetRolesQuery } from '../get-roles.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRolesQuery)
export class GetRolesQueryHandler implements IQueryHandler<GetRolesQuery> {
	constructor(
		@Inject(IRoleReadRepositoryToken) private readonly roleReadRepository: IRoleReadRepository,
	) {}

	async execute(): Promise<RoleReadModel[]> {
		return await this.roleReadRepository.getRoleList();
	}
}
