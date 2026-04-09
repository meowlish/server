import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetExamStatsDto implements exam.GetExamStatsDto {
	@IsString()
	examId!: string;
}
