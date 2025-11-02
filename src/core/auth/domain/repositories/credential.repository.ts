import { LoginType } from '@core/auth/enums/login-type.enum';

import { Credential } from '../entities/credential.entity';

export interface ICredentialRepository {
	findOne(identifier: string, loginType: LoginType): Promise<Credential | null>;
	create(credential: Credential): Promise<void>;
	update(credential: Credential): Promise<void>;
	delete(id: string): Promise<void>;
}

export const ICredentialRepositoryToken = Symbol('ICredentialRepository');
