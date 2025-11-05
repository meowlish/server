import { IsInt, IsOptional, IsString } from 'class-validator';

import { CreateQuestionDto as ICreateQuestionDto } from '@common/generated/exam';

export class CreateQuestionDto implements ICreateQuestionDto {
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@IsString()
	sectionId!: string;
}
