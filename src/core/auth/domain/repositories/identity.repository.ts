import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';

import { Identity } from '../entities/identity.entity';

export interface IIdentityRepository {
	findOneById(id: string, deleted?: boolean): Promise<Identity | null>;
	findOneByUsername(username: string, deleted?: boolean): Promise<Identity | null>;
	getClaimsOfId(
		id: string,
		deleted?: boolean,
	): Promise<{ roles: Role[]; permissions: Permission[] }>;
	create(identity: Identity): Promise<Identity>;
	update(identity: Identity): Promise<Identity>;
	softDelete(identity: Identity): Promise<Identity>;
}

export const IIdentityRepositoryToken = Symbol('IIdentityRepository');
