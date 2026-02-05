import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateQuestionDto implements exam.CreateQuestionDto {
	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@Expose()
	@IsString()
	sectionId!: string;
}
