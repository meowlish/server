import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersBadgesDto {
	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	limit?: number;
}
