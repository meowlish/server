import { IsOptional, IsString } from 'class-validator';

export class RemoveAnswerDto {
	@IsString()
	attemptId!: string;

	@IsString()
	questionId!: string;

	@IsOptional()
	@IsString()
	answer?: string;
}
