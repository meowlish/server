import { file } from '@server/generated';
import { IsArray, IsString } from 'class-validator';

export class GetUrlsDto implements file.GetUrlsDto {
	@IsArray()
	@IsString({ each: true })
	ids!: string[];
}
