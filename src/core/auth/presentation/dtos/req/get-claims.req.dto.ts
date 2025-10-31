import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { GetClaimsDto as IGetClaimsDto } from '@common/generated/auth';

@Exclude()
export class GetClaimsDto implements IGetClaimsDto {
	@Expose()
	@IsString()
	identityId!: string;
}
