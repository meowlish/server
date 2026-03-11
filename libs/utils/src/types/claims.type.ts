import { Permission, Role } from '@server/typing';

export type Claims = {
	sub: string;
	roles: Role[];
	permissions: Permission[];
};
