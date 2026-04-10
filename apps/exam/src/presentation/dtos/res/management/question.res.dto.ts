import { FilePreview } from './file-preview.res.dto';
import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class Choice implements exam.QuestionManagementInfo_ChoiceManagementInfo {
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

export class QuestionManagementInfo implements exam.QuestionManagementInfo {
	@Expose()
	@Type(() => Choice)
	choices!: Choice[];

	@Expose()
	content!: string;

	@Expose()
	explanation!: string;

	@Expose()
	@Type(() => FilePreview)
	files!: FilePreview[];

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
