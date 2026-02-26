import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LoginMailDto {
	@ApiProperty({ example: 'user@example.com', description: 'User email address' })
	@Expose()
	@IsEmail()
	mail!: string;

	@ApiProperty({ example: 'StrongP@ssw0rd!', description: 'User password' })
	@Expose()
	@IsStrongPassword()
	password!: string;
}
