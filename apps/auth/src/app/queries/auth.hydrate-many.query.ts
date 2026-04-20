import { HydratedIdentityReadModel } from '../../domain/entities/identity.read-model';
import { Query } from '@server/utils';

export class HydrateManyQuery extends Query<HydratedIdentityReadModel[], { ids: string[] }> {}
