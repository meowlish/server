import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginMailDto {
	@IsEmail()
	mail!: string;

	@IsStrongPassword()
	password!: string;
}
