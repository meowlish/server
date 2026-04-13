import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AddedTagDto {
	@Expose()
	@ApiProperty()
	id!: string;
}
