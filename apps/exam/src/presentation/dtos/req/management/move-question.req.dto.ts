import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class MoveQuestionDto implements exam.MoveQuestionDto {
	@Expose()
	@IsString()
	id!: string;

	@Expose()
	@IsInt()
	@IsOptional()
	index?: number;

	@Expose()
	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
