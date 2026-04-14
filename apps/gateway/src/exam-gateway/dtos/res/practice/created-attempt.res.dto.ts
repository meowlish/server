import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedAttemptDto {
	@Expose()
	@ApiProperty()
	id!: string;
}
