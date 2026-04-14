import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedExamDto {
	@Expose()
	@ApiProperty()
	id!: string;
}
