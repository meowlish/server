import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetUsersBadgesDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	@ApiPropertyOptional({ type: Number })
	limit?: number;
}
