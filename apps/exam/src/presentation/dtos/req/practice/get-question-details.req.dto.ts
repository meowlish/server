import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetQuestionDetailsDto implements exam.GetDetailedQuestionDto {
	@IsString()
	questionId!: string;
}
