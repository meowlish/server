import { FilePreviewDto } from './file-preview.res.dto';
import { Expose, Type } from 'class-transformer';

export class SectionManagementInfoDto {
	@Expose()
	contentType!: string;

	@Expose()
	directive!: string;

	@Expose()
	examId!: string;

	@Expose()
	@Type(() => FilePreviewDto)
	files!: FilePreviewDto[];

	@Expose()
	id!: string;

	@Expose()
	name?: string;

	@Expose()
	parentId?: string;

	@Expose()
	questionIds!: string[];

	@Expose()
	tags!: string[];
}
