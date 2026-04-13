import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

class OptionsDto {
	@IsNumber()
	@IsOptional()
	@IsPositive()
	@ApiPropertyOptional({ type: Number })
	duration?: number;

	@IsOptional()
	@IsString({ each: true })
	@ApiPropertyOptional({ type: [String] })
	sectionIds: string[] = [];
}

export class AttemptDto {
	@Type(() => OptionsDto)
	@IsOptional()
	@ValidateNested()
	@ApiPropertyOptional({ type: () => OptionsDto })
	options?: OptionsDto;
}
