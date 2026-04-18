import { FindIdentitiesQueryHandler } from './find-identities.handler';
import { FindIdentityIdsQueryHandler } from './find-identity-ids.handler';
import { GetCredentialsQueryHandler } from './get-credentials.handler';
import { GetPermissionsQueryHandler } from './get-permissions.handler';
import { GetRolesQueryHandler } from './get-roles.handler';

export const AuthQueryHandlers = [
	FindIdentitiesQueryHandler,
	FindIdentityIdsQueryHandler,
	GetRolesQueryHandler,
	GetPermissionsQueryHandler,
	GetCredentialsQueryHandler,
];
