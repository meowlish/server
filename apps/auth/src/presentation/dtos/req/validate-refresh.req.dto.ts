import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ValidateRefreshDto implements auth.ValidateRefreshDto {
	@Expose()
	@IsString()
	identityId!: string;

	@Expose()
	@IsNumber()
	iat: number;
}
