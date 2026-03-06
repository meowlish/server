import { auth } from '@server/generated';
import { IsNumber, IsString } from 'class-validator';

export class ValidateRefreshDto implements auth.ValidateRefreshDto {
	@IsString()
	identityId!: string;

	@IsNumber()
	iat!: number;
}
