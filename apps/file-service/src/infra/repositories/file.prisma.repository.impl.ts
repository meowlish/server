import { IFileRepository } from '../../domain/repositories/file.repository';
import { FileMetadata } from '../../types/file-metadata.type';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/file';

@Injectable()
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

	async incrementRef(ids: string[], count = 1): Promise<void> {
		await this.txHost.tx.file.updateMany({
			where: { id: { in: ids } },
			data: { refCount: { increment: count } },
		});
	}

	async decrementRef(ids: string[], count = 1): Promise<void> {
		await this.txHost.tx.file.updateMany({
			where: { id: { in: ids } },
			data: { refCount: { decrement: count } },
		});
	}

	async remove(ids: string[]): Promise<void> {
		await this.txHost.tx.file.deleteMany({ where: { id: { in: ids } } });
	}

	async getOrphanedFiles(): Promise<{ id: string; updatedAt: Date }[]> {
		return await this.txHost.tx.file.findMany({
			where: { refCount: { equals: 0 } },
			select: { id: true, updatedAt: true },
		});
	}
}
