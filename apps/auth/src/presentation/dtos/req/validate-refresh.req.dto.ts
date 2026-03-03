import { auth } from '@server/generated';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ValidateRefreshDto implements auth.ValidateRefreshDto {
	@Expose()
	@IsString()
	identityId!: string;

	@Expose()
	@Type(() => Number)
	@IsNumber()
	iat!: number;
}
