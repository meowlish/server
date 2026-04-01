import {
	type IBadgeReadRepository,
	IBadgeReadRepositoryToken,
} from '../../../domain/repositories/badge.read.repository';
import {
	GetUsersBadgesCursor,
	GetUsersBadgesQuery,
	GetUsersBadgesQueryResult,
} from '../get-users-badges.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CursorPaginationHelper } from '@server/utils';

@QueryHandler(GetUsersBadgesQuery)
export class GetUsersBadgesQueryHandler implements IQueryHandler<GetUsersBadgesQuery> {
	private readonly cursorPaginationHelper: CursorPaginationHelper;

	constructor(
		@Inject(IBadgeReadRepositoryToken) private readonly badgeReadRepository: IBadgeReadRepository,
	) {
		this.cursorPaginationHelper = new CursorPaginationHelper(
			`${process.env.HOST}${process.env.PORT}`,
		);
	}

	async execute(query: GetUsersBadgesQuery): Promise<GetUsersBadgesQueryResult> {
		const decodedCursor =
			query.payload.cursor ?
				this.cursorPaginationHelper.decodeCursor<GetUsersBadgesCursor>(query.payload.cursor)
			:	undefined;
		const badges = await this.badgeReadRepository.getUsersBadges(query.payload.userId, {
			lastId: decodedCursor?.lastId,
			limit: query.payload.limit ?? decodedCursor?.limit ?? 10,
		});
		const encodedCursor = this.cursorPaginationHelper.encodeCursor<GetUsersBadgesCursor>({
			lastId: badges.at(-1)?.id,
			limit: query.payload.limit ?? decodedCursor?.limit,
		});
		return { badges: badges, cursor: encodedCursor };
	}
}
