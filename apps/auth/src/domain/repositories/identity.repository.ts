import { LoginType } from '../../enums/login-type.enum';
import { Identity } from '../entities/identity.entity';
import { HydratedIdentityReadModel, IdentityReadModel } from '../read-models/identity.read-model';
import { Permission, Role } from '@server/typing';

export interface IIdentityRepository {
	findOneById(id: string, deleted?: boolean): Promise<Identity | null>;
	findOneCredential(
		identifier: string,
		loginType: LoginType,
	): Promise<{ identityId: string; secretHash: string | null } | null>;
	findOneByUsername(username: string, deleted?: boolean): Promise<Identity | null>;
	getClaimsOfId(
		id: string,
		deleted?: boolean,
	): Promise<{ roles: Role[]; permissions: Permission[] } | null>;
	save(identity: Identity): Promise<void>;
	softDelete(id: string): Promise<void>;
	findIdentityIds(options?: {
		usernameOrCredentialIdentifier?: string;
		lastId?: string;
		limit?: number;
	}): Promise<string[]>;
	findIdentities(options?: {
		usernameOrCredentialIdentifierOrId?: string;
		hasRoles?: string[];
		hasPerms?: string[];
		lastId?: string;
		limit?: number;
	}): Promise<IdentityReadModel[]>;
	hydrate(id: string): Promise<HydratedIdentityReadModel | null>;
	hydrateMany(ids: string[]): Promise<HydratedIdentityReadModel[]>;
}

export const IIdentityRepositoryToken = Symbol('IIdentityRepository');
