import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class LogOutAllDto implements auth.LogOutAllDto {
	@Expose()
	@IsString()
	identityId!: string;
}
