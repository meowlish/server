import { IsInt, IsOptional } from 'class-validator';

export class CreateSectionDto {
	@IsInt()
	@IsOptional()
	index?: number | undefined;
}
