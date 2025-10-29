import { Credential } from '@core/auth/domain/entities/credential.entity';
import { ICredentialRepository } from '@core/auth/domain/repositories/credential.repository';
import { LoginType } from '@core/auth/enums/login-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Credential as PrismaCredential } from '@prisma/client';

import { parseEnum } from '@common/utils/functions/string-enum';

@Injectable()
export class CredentialPrismaMapper {
	loginTypeMap(from: string): LoginType {
		return parseEnum(LoginType, from);
	}

	toDomain(from: PrismaCredential): Credential {
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

	toOrm(from: Credential): RepoCredential {
		return {
			identifier: from.identifier,
			loginType: from.loginType,
			identityId: from.identityId,
			secretHash: from.secretHash,
		};
	}
}

@Injectable()
export class CredentialPrismaRepository implements ICredentialRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
		private readonly mapper: CredentialPrismaMapper,
	) {}

	async create(credential: Credential): Promise<Credential> {
		const data = this.mapper.toOrm(credential);
		const createdCred = await this.txHost.tx.credential.create({ data });
		const mappedCred = this.mapper.toDomain(createdCred);
		return mappedCred;
	}

	async delete(credential: Credential): Promise<Credential> {
		const deletedCred = await this.txHost.tx.credential.delete({ where: { id: credential.id } });
		const mappedCred = this.mapper.toDomain(deletedCred);
		return mappedCred;
	}

	async findOne(identifier: string, loginType: LoginType): Promise<Credential | null> {
		const foundCred = await this.txHost.tx.credential.findUnique({
			where: { identifier_loginType: { identifier, loginType } },
		});
		return foundCred === null ? null : this.mapper.toDomain(foundCred);
	}

	async update(credential: Credential): Promise<Credential> {
		const data = this.mapper.toOrm(credential);
		const updatedCred = await this.txHost.tx.credential.update({
			where: { id: credential.id },
			data,
		});
		const mappedCred = this.mapper.toDomain(updatedCred);
		return mappedCred;
	}
}

type RepoCredential = Omit<PrismaCredential, 'id'>;
