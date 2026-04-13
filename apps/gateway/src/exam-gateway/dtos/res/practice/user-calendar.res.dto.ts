import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserCalendarDto {
	@Expose()
	@ApiProperty({
		type: 'object',
		additionalProperties: { type: 'number' },
	})
	history!: Record<number, number>;
}
