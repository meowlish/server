import { SectionType } from '../../../../enums/section-type.enum';
import { exam } from '@server/generated';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto implements exam.UpdateSectionDto {
	@IsEnum(SectionType)
	@IsOptional()
	contentType?: SectionType | undefined;

	@IsOptional()
	@IsString()
	directive?: string | undefined;

	@IsString()
	id!: string;

	@IsOptional()
	@IsString()
	name?: string | undefined;

	@IsBoolean()
	@IsOptional()
	setNameNull?: boolean | undefined;
}
