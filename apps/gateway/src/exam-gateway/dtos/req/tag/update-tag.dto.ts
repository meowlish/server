import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTagDto {
	@IsString()
	@ApiProperty()
	name!: string;
}
