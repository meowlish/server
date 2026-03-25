import { IFileRepository } from '../../domain/repositories/file.repository';
import { FileMetadata } from '../../types/file-metadata.type';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaClient } from '@prisma-client/file';

export class FilePrismaRepository implements IFileRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	async create(fileMetadata: FileMetadata): Promise<string> {
		const newFile = await this.txHost.tx.file.create({
			data: {
				size: fileMetadata.fileSize,
				name: fileMetadata.fileName,
				mimeType: fileMetadata.contentType,
			},
		});
		return newFile.id;
	}
}
