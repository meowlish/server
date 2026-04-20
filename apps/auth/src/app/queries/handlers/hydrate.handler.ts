import { HydratedIdentityReadModel } from '../../../domain/entities/identity.read-model';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { HydrateQuery } from '../auth.hydrate.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HydrateQuery)
export class HydrateQueryHandler implements IQueryHandler<HydrateQuery> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	async execute(query: HydrateQuery): Promise<HydratedIdentityReadModel> {
		const payload = query.payload;
		const identity = await this.identityRepository.hydrate(payload.id);
		if (!identity) throw new NotFoundException('IdentityNotFound');
		return identity;
	}
}
