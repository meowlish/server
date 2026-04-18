import { CredentialReadModel } from '../../domain/entities/credential.read-model';
import { Query } from '@server/utils';

export class GetCredentialsQuery extends Query<CredentialReadModel[], { identityId: string }> {}
