import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AddNoteDto {
	@IsString()
	@ApiProperty()
	@Length(0, 500)
	note!: string;
}
