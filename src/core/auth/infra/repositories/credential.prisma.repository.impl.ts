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
	mapLoginType(from: string): LoginType {
		return parseEnum(LoginType, from);
	}

	toDomain(from: PrismaCredential): Credential {
		const credential = new Credential({
			...from,
			loginType: this.mapLoginType(from.loginType),
			isSecretHashed: true, //since result from ORM is from database, and all entries in DB are hashed
		});
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

	async findOne(identifier: string, loginType: LoginType): Promise<Credential | null> {
		const foundCred = await this.txHost.tx.credential.findUnique({
			where: { identifier_loginType: { identifier, loginType } },
		});
		return foundCred ? this.mapper.toDomain(foundCred) : null;
	}

	async create(credential: Credential): Promise<void> {
		const data = this.mapper.toOrm(credential);
		await this.txHost.tx.credential.create({ data });
	}

	async update(credential: Credential): Promise<void> {
		const data = this.mapper.toOrm(credential);
		await this.txHost.tx.credential.update({
			where: { id: credential.id },
			data,
		});
	}

	async delete(id: string): Promise<void> {
		await this.txHost.tx.credential.delete({ where: { id } });
	}
}

type RepoCredential = Omit<PrismaCredential, 'id'>;
