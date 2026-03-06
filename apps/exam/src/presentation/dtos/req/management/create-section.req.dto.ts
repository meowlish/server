import { exam } from '@server/generated';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto implements exam.CreateSectionDto {
	@IsOptional()
	@IsString()
	examId?: string | undefined;

	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
