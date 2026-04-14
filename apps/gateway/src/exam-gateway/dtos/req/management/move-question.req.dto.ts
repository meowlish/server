import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MoveQuestionDto {
	@IsInt()
	@IsOptional()
	@ApiPropertyOptional({ type: Number })
	index?: number;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	sectionId?: string;
}
