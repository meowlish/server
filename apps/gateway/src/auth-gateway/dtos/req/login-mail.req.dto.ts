import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginMailDto {
	@IsEmail()
	@ApiProperty()
	mail!: string;

	@IsString()
	@ApiProperty()
	password!: string;
}
