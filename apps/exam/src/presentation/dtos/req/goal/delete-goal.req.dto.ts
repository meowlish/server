import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class DeleteGoalDto implements exam.DeleteGoalDto {
	@IsString()
	uid!: string;
}
