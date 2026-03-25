import { file } from '@server/generated';
import { Expose } from 'class-transformer';

export class PresignedUrlResponseDto implements file.PresignedUrlResponse {
	@Expose()
	fileName!: string;

	@Expose()
	id!: string;

	@Expose()
	uploadUrl!: string;
}
