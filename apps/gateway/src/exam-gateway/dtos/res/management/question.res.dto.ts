import { FilePreviewDto } from './file-preview.res.dto';
import { Expose, Type } from 'class-transformer';

class ChoiceDto {
	@Expose()
	content?: string;

	@Expose()
	id!: string;

	@Expose()
	isCorrect!: boolean;

	@Expose()
	key!: string;

	@Expose()
	questionId!: string;
}

export class QuestionManagementInfoDto {
	@Expose()
	@Type(() => ChoiceDto)
	choices!: ChoiceDto[];

	@Expose()
	content!: string;

	@Expose()
	explanation!: string;

	@Expose()
	@Type(() => FilePreviewDto)
	files!: FilePreviewDto[];

	@Expose()
	id!: string;

	@Expose()
	points!: number;

	@Expose()
	sectionId!: string;

	@Expose()
	tags!: string[];

	@Expose()
	type!: string;
}
