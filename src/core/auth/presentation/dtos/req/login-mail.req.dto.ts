import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

import { LoginMailDto as ILoginMailDto } from '@common/generated/auth';

@Exclude()
export class LoginMailDto implements ILoginMailDto {
	@Expose()
	@IsEmail()
	mail!: string;

	@Expose()
	@IsStrongPassword()
	password!: string;
}
