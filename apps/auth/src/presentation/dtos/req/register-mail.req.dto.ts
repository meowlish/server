import { auth } from '@server/generated';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterMailDto implements auth.RegisterMailDto {
	@IsEmail()
	mail!: string;

	@IsString()
	username!: string;

	@IsStrongPassword()
	password!: string;
}
