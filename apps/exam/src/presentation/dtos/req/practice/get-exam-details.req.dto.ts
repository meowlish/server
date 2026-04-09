import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetExamDetailsDto implements exam.GetExamDetailsDto {
	@IsString()
	examId!: string;
}
