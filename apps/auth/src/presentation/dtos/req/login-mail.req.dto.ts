import { auth } from '@server/generated';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginMailDto implements auth.LoginMailDto {
	@IsEmail()
	mail!: string;

	@IsStrongPassword()
	password!: string;
}
