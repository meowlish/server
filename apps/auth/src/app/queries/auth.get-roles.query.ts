import { RoleReadModel } from '../../domain/entities/role.read-model';
import { Query } from '@server/utils';

export class GetRolesQuery extends Query<RoleReadModel[]> {}
