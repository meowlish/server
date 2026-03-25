import { FileMetadata } from '../../types/file-metadata.type';
import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';

@Injectable()
export class FileService {
	constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {}

	private readonly MINIO_BUCKET_NAME = 'public';

	async getPresignedUrl(fileMetadata: FileMetadata): Promise<{
		id: string;
		uploadUrl: string;
		fileName: string;
	}> {
		const url = await this.minioClient.presignedPutObject(this.MINIO_BUCKET_NAME, 'postgres_id');
		return {
			id: 'postgres_id',
			uploadUrl: url,
			fileName: fileMetadata.fileName,
		};
	}
}
