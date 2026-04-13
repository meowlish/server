import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateExamDto {
	@IsString()
	@ApiProperty()
	description!: string;

	@IsInt()
	@IsPositive()
	@ApiProperty({ type: Number })
	duration!: number;

	@IsString()
	@ApiProperty()
	title!: string;
}
