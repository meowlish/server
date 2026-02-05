import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

@Exclude()
export class CreateSectionDto {
	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;
}
