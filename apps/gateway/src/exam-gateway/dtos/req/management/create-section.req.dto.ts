import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateSectionDto {
	@IsInt()
	@IsOptional()
	@ApiPropertyOptional({ type: Number })
	index?: number;
}
