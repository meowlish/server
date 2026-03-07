import { IsString, Length } from 'class-validator';

export class AddNoteDto {
	@IsString()
	attemptId!: string;

	@IsString()
	questionId!: string;

	@IsString()
	@Length(0, 500)
	note!: string;
}
