import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

@Exclude()
export class CreateQuestionDto {
	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;
}
