import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterMailDto {
	@IsEmail()
	mail!: string;

	@IsString()
	username!: string;

	@IsStrongPassword()
	password!: string;
}
