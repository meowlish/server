import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class MoveQuestionDto {
	@Expose()
	@IsInt()
	@IsOptional()
	index?: number;

	@Expose()
	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
