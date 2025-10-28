import { Identity } from '../entities/identity.entity';

export interface IIdentityRepository {
	findOneById(id: string, deleted: boolean): Promise<Identity | null>;
	findOneByUsername(username: string, deleted: boolean): Promise<Identity | null>;
	create(identity: Identity): Promise<Identity>;
	update(identity: Identity): Promise<Identity>;
	softDelete(identity: Identity): Promise<Identity>;
}

export const IIdentityRepositoryToken = Symbol('IIdentityRepository');
