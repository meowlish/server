import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class FilePreviewDto implements exam.FilePreviewInfo {
	@Expose()
	id!: string;

	@Expose()
	url?: string;
}
