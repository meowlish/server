import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import {
	FindIdentityIdsCursor,
	FindIdentityIdsQuery,
	FindIdentityIdsQueryResult,
} from '../auth.find-identity-ids.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CursorPaginationHelper } from '@server/utils';

@QueryHandler(FindIdentityIdsQuery)
export class FindIdentityIdsQueryHandler implements IQueryHandler<FindIdentityIdsQuery> {
	private readonly cursorPaginationHelper: CursorPaginationHelper;

	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {
		this.cursorPaginationHelper = new CursorPaginationHelper(
			`${process.env.HOST}${process.env.PORT}FindIdentityIds`,
		);
	}

	async execute(query: FindIdentityIdsQuery): Promise<FindIdentityIdsQueryResult> {
		const payload = query.payload;
		const decodedCursor =
			payload.cursor ?
				this.cursorPaginationHelper.decodeCursor<FindIdentityIdsCursor>(payload.cursor)
			:	undefined;

		const inUseIdentifier = decodedCursor?.usernameOrCredential ?? payload.usernameOrCredential;
		const inUseLimit = payload.limit ?? decodedCursor?.limit ?? 10;

		const identities = await this.identityRepository.findIdentityIds({
			usernameOrCredentialIdentifier: inUseIdentifier,
			lastId: decodedCursor?.lastId,
			limit: inUseLimit,
		});

		const encodedCursor = this.cursorPaginationHelper.encodeCursor<FindIdentityIdsCursor>({
			usernameOrCredential: inUseIdentifier,
			lastId: identities.at(-1),
			limit: inUseLimit,
		});

		return { ids: identities, cursor: encodedCursor };
	}
}
