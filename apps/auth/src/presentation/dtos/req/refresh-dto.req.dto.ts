import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class RefreshDto implements auth.RefreshDto {
	@Expose()
	@IsString()
	identityId!: string;
}
