import { IsEmail, IsString } from 'class-validator';

export class LoginMailDto {
	@IsEmail()
	mail!: string;

	@IsString()
	password!: string;
}
