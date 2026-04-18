import { IdentityReadModel } from '../../domain/entities/identity.read-model';
import { Query } from '@server/utils';

export type FindIdentitiesQueryResult = {
	identities: IdentityReadModel[];
	cursor: string;
};

export type FindIdentitiesQueryPayload = {
	cursor?: string;
} & Omit<FindIdentitiesCursor, 'lastId'>;

export type FindIdentitiesCursor = {
	// high prec
	usernameOrCredential?: string;
	hasRoles?: string[];
	hasPerms?: string[];
	lastId?: string;
	// low prec
	limit?: number;
};

export class FindIdentitiesQuery extends Query<
	FindIdentitiesQueryResult,
	FindIdentitiesQueryPayload
> {}
