import { exam } from '@server/generated';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto implements exam.CreateQuestionDto {
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@IsString()
	sectionId!: string;
}
