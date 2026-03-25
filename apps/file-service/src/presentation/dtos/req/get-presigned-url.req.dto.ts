import { file } from '@server/generated';
import { IsMimeType, IsNumber, IsString } from 'class-validator';

export class GetPresignedUrlDto implements file.GetPresignedUrlDto {
	@IsString()
	fileName!: string;

	@IsNumber()
	fileSize!: number;

	@IsMimeType()
	contentType!: string;
}
