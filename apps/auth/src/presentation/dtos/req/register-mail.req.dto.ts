import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@Exclude()
export class RegisterMailDto implements auth.RegisterMailDto {
	@Expose()
	@IsEmail()
	mail!: string;

	@Expose()
	@IsString()
	username!: string;

	@Expose()
	@IsStrongPassword()
	password!: string;
}
