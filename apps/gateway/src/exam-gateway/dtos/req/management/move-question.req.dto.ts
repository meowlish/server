import { IsInt, IsOptional, IsString } from 'class-validator';

export class MoveQuestionDto {
	@IsInt()
	@IsOptional()
	index?: number;

	@IsOptional()
	@IsString()
	sectionId?: string;
}
