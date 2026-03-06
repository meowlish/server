import { exam } from '@server/generated';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MoveQuestionDto implements exam.MoveQuestionDto {
	@IsString()
	id!: string;

	@IsInt()
	@IsOptional()
	index?: number;

	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
