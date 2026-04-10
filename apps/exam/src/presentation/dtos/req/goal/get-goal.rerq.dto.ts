import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetGoalDto implements exam.GetGoalDto {
	@IsString()
	uid!: string;
}
