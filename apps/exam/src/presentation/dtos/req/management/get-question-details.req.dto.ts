import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetQuestionManagementDetailsDto implements exam.GetQuestionManagementDetailsDto {
	@IsString()
	questionId!: string;
}
