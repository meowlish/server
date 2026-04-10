import { achievement } from '@server/generated';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetUsersBadgesDto implements achievement.UserBadgesRequestDto {
	@IsString()
	userId!: string;

	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	limit?: number;
}
