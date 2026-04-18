import { CredentialReadModel } from '../entities/credential.read-model';

export interface ICredentialReadRepository {
	getCredentialList(identityId: string): Promise<CredentialReadModel[]>;
}

export const ICredentialReadRepositoryToken = Symbol('ICredentialReadRepository');
