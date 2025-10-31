import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';

export type Claims = {
	sub: string;
	roles: Role[];
	permissions: Permission[];
};
