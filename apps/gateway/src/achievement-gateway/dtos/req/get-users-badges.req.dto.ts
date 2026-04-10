import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetUsersBadgesDto {
	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	limit?: number;
}
