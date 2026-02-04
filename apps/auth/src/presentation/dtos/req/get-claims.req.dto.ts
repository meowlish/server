import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class GetClaimsDto implements auth.GetClaimsDto {
	@Expose()
	@IsString()
	identityId!: string;
}
