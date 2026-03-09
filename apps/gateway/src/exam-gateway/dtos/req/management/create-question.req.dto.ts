import { IsInt, IsOptional } from 'class-validator';

export class CreateQuestionDto {
	@IsInt()
	@IsOptional()
	index?: number;
}
