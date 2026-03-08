import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class AddCardToListDto {
	@Expose()
	@IsNumber()
	@IsOptional()
	@ApiProperty({
		example: 1,
		description: 'Position of the card in the list (0-indexed). Unset to append at the end.',
		required: false,
	})
	position?: number;
}
