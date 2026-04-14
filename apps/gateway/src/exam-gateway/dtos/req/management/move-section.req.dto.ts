import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class MoveSectionDto {
	@IsInt()
	@IsOptional()
	@ApiPropertyOptional({ type: Number })
	index?: number;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	parentId?: string;

	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional()
	toRoot?: boolean;
}
