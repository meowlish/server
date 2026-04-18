import { auth } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class RoleDto implements auth.Role {
	@Expose()
	id!: string;

	@Expose()
	name!: string;

	@Expose()
	permissions!: string[];
}

export class RolesDto implements auth.RoleList {
	@Expose()
	@Type(() => RoleDto)
	roles!: RoleDto[];
}
