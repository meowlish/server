import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

export type Claims = {
	sub: string;
	roles: Role[];
	permissions: Permission[];
};
