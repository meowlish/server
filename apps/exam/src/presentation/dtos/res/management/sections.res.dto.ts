import { FilePreview } from './file-preview.res.dto';
import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class SectionManagementInfo implements exam.SectionManagementInfo {
	@Expose()
	contentType!: string;

	@Expose()
	directive!: string;

	@Expose()
	examId!: string;

	@Expose()
	@Type(() => FilePreview)
	files!: FilePreview[];

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
