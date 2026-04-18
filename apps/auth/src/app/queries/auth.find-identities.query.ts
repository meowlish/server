import { Claims, Query } from '@server/utils';

export type FindIdentitiesQueryResult = {
	claims: Claims[];
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
