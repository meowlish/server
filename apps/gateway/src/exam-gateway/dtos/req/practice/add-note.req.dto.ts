import { IsString, Length } from 'class-validator';

export class AddNoteDto {
	@IsString()
	@Length(0, 500)
	note!: string;
}
