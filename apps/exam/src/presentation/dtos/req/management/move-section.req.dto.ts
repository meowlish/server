import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class MoveSectionDto implements exam.MoveSectionDto {
	@Expose()
	@IsString()
	id!: string;

	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	parentId?: string | undefined;

	@Expose()
	@IsBoolean()
	@IsOptional()
	toRoot?: boolean | undefined;
}
