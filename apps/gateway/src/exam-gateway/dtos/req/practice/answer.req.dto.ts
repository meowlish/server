import { IsString } from 'class-validator';

export class AnswerDto {
	@IsString()
	attemptId!: string;

	@IsString()
	questionId!: string;

	@IsString()
	answer!: string;
}
