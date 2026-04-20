import { HydratedIdentityReadModel } from '../../../domain/entities/identity.read-model';
import {
	type IIdentityRepository,
	IIdentityRepositoryToken,
} from '../../../domain/repositories/identity.repository';
import { HydrateManyQuery } from '../auth.hydrate-many.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HydrateManyQuery)
export class HydrateManyQueryHandler implements IQueryHandler<HydrateManyQuery> {
	constructor(
		@Inject(IIdentityRepositoryToken) private readonly identityRepository: IIdentityRepository,
	) {}

	async execute(query: HydrateManyQuery): Promise<HydratedIdentityReadModel[]> {
		const payload = query.payload;
		const identities = await this.identityRepository.hydrateMany(payload.ids);
		return identities;
	}
}
