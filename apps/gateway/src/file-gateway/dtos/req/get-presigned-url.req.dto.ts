import { IsMimeType, IsNumber, IsString } from 'class-validator';

export class GetPresignedUrlDto {
	@IsString()
	fileName!: string;

	@IsNumber()
	fileSize!: number;

	@IsMimeType()
	contentType!: string;
}
