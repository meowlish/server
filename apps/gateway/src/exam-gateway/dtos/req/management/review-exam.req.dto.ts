import { IsString } from 'class-validator';

export class ReviewExamDto {
	@IsString()
	status!: string;
}
