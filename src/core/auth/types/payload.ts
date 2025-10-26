import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';

export type Payload = {
	// uid
	sub: string;

	// role name
	roles: Role;
	permissions: Permission[];
};
