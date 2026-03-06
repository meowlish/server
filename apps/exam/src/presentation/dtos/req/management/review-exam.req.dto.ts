import { ExamStatus } from '../../../../enums/exam-status.enum';
import { exam } from '@server/generated';
import { IsEnum, IsString } from 'class-validator';

export class ReviewExamDto implements exam.ReviewExamDto {
	@IsString()
	id!: string;

	@IsEnum(ExamStatus)
	status!: ExamStatus;
}
