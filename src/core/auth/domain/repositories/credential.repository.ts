import { Credential } from '../entities/credential.entity';

export interface ICredentialRepository {
	create(credential: Credential): Promise<Credential>;
}
