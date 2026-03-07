import { IsString } from 'class-validator';

export class EndAttemptDto {
	@IsString()
	attemptId!: string;
}
