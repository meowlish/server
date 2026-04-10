import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class FilePreview implements exam.FilePreviewInfo {
	@Expose()
	id!: string;

	@Expose()
	url?: string;
}
