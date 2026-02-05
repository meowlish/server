import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateSectionDto implements exam.CreateSectionDto {
	@Expose()
	@IsOptional()
	@IsString()
	examId?: string | undefined;

	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
