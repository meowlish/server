import { ExamStatus } from '@core/exam/enums/exam-status.enum';
import { IsEnum, IsString } from 'class-validator';

import { ReviewExamDto as IReviewExamDto } from '@common/generated/exam';

export class ReviewExamDto implements IReviewExamDto {
	@IsString()
	id!: string;

	@IsEnum(ExamStatus)
	status!: ExamStatus;
}
