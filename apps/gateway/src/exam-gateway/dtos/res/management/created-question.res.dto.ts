import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedQuestionDto {
	@Expose()
	@ApiProperty()
	id!: string;
}
