import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseTokensDto {
	@Expose()
	@ApiProperty()
	accessToken!: string;

	@Expose()
	@ApiPropertyOptional()
	refreshToken?: string;
}
