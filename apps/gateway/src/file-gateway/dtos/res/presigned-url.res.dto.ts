import { Expose } from 'class-transformer';

export class PresignedUrlResponseDto {
	@Expose()
	fileName!: string;

	@Expose()
	id!: string;

	@Expose()
	uploadUrl!: string;

	@Expose()
	formData!: Record<string, string>;
}
