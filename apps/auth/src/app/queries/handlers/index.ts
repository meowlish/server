import { GetCredentialsQueryHandler } from './get-credentials.handler';
import { GetPermissionsQueryHandler } from './get-permissions.handler';
import { GetRolesQueryHandler } from './get-roles.handler';

export const AuthQueryHandlers = [
	GetRolesQueryHandler,
	GetPermissionsQueryHandler,
	GetCredentialsQueryHandler,
];
