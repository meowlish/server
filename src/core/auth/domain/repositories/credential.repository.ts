import { LoginType } from '@core/auth/enums/login-type.enum';

import { Credential } from '../entities/credential.entity';

export interface ICredentialRepository {
	findOne(identityId: string, loginType: LoginType): Promise<Credential | null>;
	create(credential: Credential): Promise<Credential>;
	update(credential: Credential): Promise<Credential>;
	delete(credential: Credential): Promise<Credential>;
}

export const ICredentialRepositoryToken = Symbol('ICredentialRepository');
