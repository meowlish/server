import { IsBoolean, IsMimeType, IsNumber, IsString } from 'class-validator';

export class GetPresignedUrlDto {
	@IsBoolean()
	isPublicFile!: boolean;

	@IsString()
	fileName!: string;

	@IsNumber()
	fileSize!: number;

	@IsMimeType()
	contentType!: string;
}
