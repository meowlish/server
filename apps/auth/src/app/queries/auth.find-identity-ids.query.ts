import { Query } from '@server/utils';

export type FindIdentityIdsQueryResult = {
	ids: string[];
	cursor: string;
};

export type FindIdentityIdsQueryPayload = {
	cursor?: string;
} & Omit<FindIdentityIdsCursor, 'lastId'>;

export type FindIdentityIdsCursor = {
	// high prec
	usernameOrCredential?: string;
	lastId?: string;
	// low prec
	limit?: number;
};

export class FindIdentityIdsQuery extends Query<
	FindIdentityIdsQueryResult,
	FindIdentityIdsQueryPayload
> {}
