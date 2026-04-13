import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMimeType, IsNumber, IsString } from 'class-validator';

export class GetPresignedUrlDto {
	@IsBoolean()
	@ApiProperty()
	isPublicFile!: boolean;

	@IsString()
	@ApiProperty()
	fileName!: string;

	@IsNumber()
	@ApiProperty({ type: Number })
	fileSize!: number;

	@IsMimeType()
	@ApiProperty()
	contentType!: string;
}
