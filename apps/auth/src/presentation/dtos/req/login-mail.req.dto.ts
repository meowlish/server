import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class LoginMailDto implements auth.LoginMailDto {
	@Expose()
	@IsEmail()
	mail!: string;

	@Expose()
	@IsStrongPassword()
	password!: string;
}
