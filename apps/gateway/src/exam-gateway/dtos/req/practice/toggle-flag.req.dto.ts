import { IsString } from 'class-validator';

export class ToggleFlagDto {
	@IsString()
	attemptId!: string;

	@IsString()
	questionId!: string;
}
