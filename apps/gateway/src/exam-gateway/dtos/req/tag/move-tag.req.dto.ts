import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MoveTagDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	parentId?: string;
}
