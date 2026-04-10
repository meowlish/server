import { FilePreviewDto } from './file-preview.res.dto';
import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class ChoiceDto implements exam.QuestionManagementInfo_ChoiceManagementInfo {
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

export class QuestionManagementInfoDto implements exam.QuestionManagementInfo {
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
