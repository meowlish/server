import { IFileRepository } from '../../domain/repositories/file.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/exam';

@Injectable()
export class FilePrismaRepositoryImpl implements IFileRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	async getAndRemoveDeletedFileIds(): Promise<string[]> {
		return await this.txHost.withTransaction(async (): Promise<string[]> => {
			const fileIds = (await this.txHost.tx.deletedFile.findMany()).map(f => f.fileId);
			await this.txHost.tx.deletedFile.deleteMany({ where: { fileId: { in: fileIds } } });
			return fileIds;
		});
	}
}
