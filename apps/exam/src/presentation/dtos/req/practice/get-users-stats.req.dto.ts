import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetUsersStatsDto implements exam.GetUserStatsDto {
	@IsString()
	uid!: string;
}
