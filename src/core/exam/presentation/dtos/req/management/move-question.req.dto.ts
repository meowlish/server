import { IsInt, IsOptional, IsString } from 'class-validator';

import { MoveQuestionDto as IMoveQuestionDto } from '@common/generated/exam';

export class MoveQuestionDto implements IMoveQuestionDto {
	@IsString()
	id!: string;

	@IsInt()
	@IsOptional()
	index?: number;

	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
