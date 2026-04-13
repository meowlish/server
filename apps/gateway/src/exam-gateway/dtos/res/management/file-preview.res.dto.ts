import { Expose } from 'class-transformer';

export class FilePreviewDto {
	@Expose()
	id!: string;

	@Expose()
	url?: string;
}
