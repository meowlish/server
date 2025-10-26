import { Credential } from '@core/auth/domain/entities/credential.entity';
import { LoginType } from '@core/auth/enums/login-type.enum';
import { Credential as PCredential } from '@prisma/client';

import { IDomainMapper } from '@common/abstract/mapper.interface';

export class CredentialPrismaMapper implements IDomainMapper<PCredential, Credential> {
	loginTypeMap(from: string): LoginType {
		switch (from) {
			case 'GOOGLE':
				return LoginType.GOOGLE;

			case 'MAIL':
				return LoginType.MAIL;

			default:
				return LoginType.MAIL;
		}
	}

	toDomain(from: PCredential): Credential {
		const credential = new Credential(
			from.identifier,
			this.loginTypeMap(from.loginType),
			from.identityId,
			{
				id: from.id,
				isSecretHashed: true,
				secretHash: from.secretHash,
			},
		);
		return credential;
	}

	toOrm(from: Credential): PCredential {
		return {
			id: from.id,
			identifier: from.identifier,
			loginType: from.loginType,
			identityId: from.identityId,
			secretHash: from.secretHash,
		};
	}
}
