import { SectionType } from '../../../../enums/section-type.enum';
import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateSectionDto implements exam.UpdateSectionDto {
	@Expose()
	@IsEnum(SectionType)
	@IsOptional()
	contentType?: SectionType | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	directive?: string | undefined;

	@Expose()
	@IsString()
	id!: string;

	@Expose()
	@IsOptional()
	@IsString()
	name?: string | undefined;

	@Expose()
	@IsBoolean()
	@IsOptional()
	setNameNull?: boolean | undefined;
}
