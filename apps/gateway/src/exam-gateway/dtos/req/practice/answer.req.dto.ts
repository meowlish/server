import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AnswerDto {
	@IsString()
	@ApiProperty()
	answer!: string;
}
