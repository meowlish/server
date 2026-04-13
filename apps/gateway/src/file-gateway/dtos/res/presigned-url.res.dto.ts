import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PresignedUrlResponseDto {
	@Expose()
	@ApiProperty()
	fileName!: string;

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty()
	uploadUrl!: string;

	@Expose()
	@ApiProperty({
		type: 'object',
		additionalProperties: { type: 'string' },
	})
	formData!: Record<string, string>;
}
