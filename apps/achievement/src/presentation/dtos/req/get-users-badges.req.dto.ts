import { achievement } from '@server/generated';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersBadgesDto implements achievement.UserBadgesRequestDto {
	@IsString()
	userId!: string;

	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	limit?: number;
}
