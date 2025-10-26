import { Credential } from '@core/auth/domain/entities/credential.entity';
import { ICredentialRepository } from '@core/auth/domain/repositories/credential.repository';
import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/db/database.service';

import { CredentialPrismaMapper } from '../mappers/credential.prisma.mapper';

@Injectable()
export class CredentialPrismaRepository implements ICredentialRepository {
	constructor(
		private readonly dbService: DatabaseService,
		private readonly mapper: CredentialPrismaMapper,
	) {}

	async create(credential: Credential): Promise<Credential> {
		const cred = await this.dbService.credential.create({ data: credential });
		await this.dbService.credential.findMany({});
		return this.mapper.toDomain(cred);
	}
}
