import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import {
	FindIdentitiesCursor,
	FindIdentitiesQuery,
	FindIdentitiesQueryResult,
} from '../auth.find-identities.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CursorPaginationHelper } from '@server/utils';

@QueryHandler(FindIdentitiesQuery)
export class FindIdentitiesQueryHandler implements IQueryHandler<FindIdentitiesQuery> {
	private readonly cursorPaginationHelper: CursorPaginationHelper;

	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {
		this.cursorPaginationHelper = new CursorPaginationHelper(
			`${process.env.HOST}${process.env.PORT}FindIdentities`,
		);
	}

	async execute(query: FindIdentitiesQuery): Promise<FindIdentitiesQueryResult> {
		const payload = query.payload;
		const decodedCursor =
			payload.cursor ?
				this.cursorPaginationHelper.decodeCursor<FindIdentitiesCursor>(payload.cursor)
			:	undefined;

		const inUseIdentifier = decodedCursor?.usernameOrCredential ?? payload.usernameOrCredential;
		const inUseHasRoles = decodedCursor?.hasRoles ?? payload.hasRoles;
		const inUseHasPerms = decodedCursor?.hasPerms ?? payload.hasPerms;
		const inUseLimit = payload.limit ?? decodedCursor?.limit ?? 10;

		const identities = await this.identityRepository.findIdentities({
			usernameOrCredentialIdentifier: inUseIdentifier,
			hasRoles: inUseHasRoles,
			hasPerms: inUseHasPerms,
			lastId: decodedCursor?.lastId,
			limit: inUseLimit,
		});

		const encodedCursor = this.cursorPaginationHelper.encodeCursor<FindIdentitiesCursor>({
			usernameOrCredential: inUseIdentifier,
			hasRoles: inUseHasRoles,
			hasPerms: inUseHasPerms,
			lastId: identities.at(-1)?.sub,
			limit: inUseLimit,
		});

		return { claims: identities, cursor: encodedCursor };
	}
}
