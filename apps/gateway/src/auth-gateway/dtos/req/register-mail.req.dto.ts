import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterMailDto {
	@IsEmail()
	@ApiProperty()
	mail!: string;

	@IsString()
	@ApiProperty()
	username!: string;

	@IsStrongPassword()
	@ApiProperty()
	password!: string;
}
