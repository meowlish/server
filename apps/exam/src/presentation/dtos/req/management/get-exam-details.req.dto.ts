import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetExamManagementDetailsDto implements exam.GetExamManagementDetailsDto {
	@IsString()
	examId!: string;
}
