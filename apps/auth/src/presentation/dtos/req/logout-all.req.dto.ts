import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class LogOutAllDto implements auth.LogOutAllDto {
	@IsString()
	identityId!: string;
}
