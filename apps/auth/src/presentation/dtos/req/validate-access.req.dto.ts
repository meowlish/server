import { auth } from '@server/generated';
import { IsNumber, IsString } from 'class-validator';

export class ValidateAccessDto implements auth.ValidateAccessDto {
	@IsString()
	identityId!: string;

	@IsNumber()
	iat!: number;
}
