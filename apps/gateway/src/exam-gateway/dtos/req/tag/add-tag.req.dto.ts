import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddTagDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	parentId?: string;

	@IsString()
	@ApiProperty()
	name!: string;
}
