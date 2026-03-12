import { auth } from '@server/generated';
import { IsEmail, IsString } from 'class-validator';

export class LoginMailDto implements auth.LoginMailDto {
	@IsEmail()
	mail!: string;

	@IsString()
	password!: string;
}
