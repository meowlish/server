import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class RegisterMailDto {
	@Expose()
	@IsEmail()
	mail!: string;

	@Expose()
	@IsStrongPassword()
	password!: string;
}
