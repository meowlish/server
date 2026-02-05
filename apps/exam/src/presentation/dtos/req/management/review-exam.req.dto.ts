import { ExamStatus } from '../../../../enums/exam-status.enum';
import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

@Exclude()
export class ReviewExamDto implements exam.ReviewExamDto {
	@Expose()
	@IsString()
	id!: string;

	@Expose()
	@IsEnum(ExamStatus)
	status!: ExamStatus;
}
