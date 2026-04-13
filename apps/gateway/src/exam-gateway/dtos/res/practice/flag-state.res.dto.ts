import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FlagStateDto {
	@Expose()
	@ApiProperty()
	state!: boolean;
}
