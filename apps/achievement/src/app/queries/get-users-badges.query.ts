import { UserBadge } from '../../domain/read-models/badge.read-model';
import { Query } from '@server/utils';

export type GetUsersBadgesQueryResult = {
	badges: UserBadge[];
	cursor: string;
};

export type GetUsersBadgesCursor = {
	lastId?: string;
	limit?: number;
};

type GetUsersBadgesQueryPayload = {
	userId: string;
	cursor?: string;
	limit?: number;
};

export class GetUsersBadgesQuery extends Query<
	GetUsersBadgesQueryResult,
	GetUsersBadgesQueryPayload
> {}
