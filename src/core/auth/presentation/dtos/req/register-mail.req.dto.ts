import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

import { RegisterMailDto as IRegisterMailDto } from '@common/generated/auth';

@Exclude()
export class RegisterMailDto implements IRegisterMailDto {
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
