import { auth } from '@server/generated';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AddMailCredDto implements auth.AddMailCredDto {
	@IsString()
	identityId!: string;

	@IsEmail()
	@IsString()
	mail!: string;

	@IsString()
	@IsStrongPassword()
	password!: string;
}
