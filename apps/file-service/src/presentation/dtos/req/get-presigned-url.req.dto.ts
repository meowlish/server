import { IsMimeType, IsNumber, IsString } from 'class-validator';

export class GetPresignedUrlDto {
	@IsString()
	filename!: string;

	@IsNumber()
	fileSize!: number;

	@IsMimeType()
	contentType!: string;
}
