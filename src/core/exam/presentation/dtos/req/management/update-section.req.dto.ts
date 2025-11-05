import { SectionType } from '@core/exam/enums/section-type.enum';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { UpdateSectionDto as IUpdateSectionDto } from '@common/generated/exam';

export class UpdateSectionDto implements IUpdateSectionDto {
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
