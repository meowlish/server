import { file } from '@server/generated';
import { Expose } from 'class-transformer';

export class UrlsDto implements file.UrlsDto {
	@Expose()
	urls!: Record<string, string>;
}
