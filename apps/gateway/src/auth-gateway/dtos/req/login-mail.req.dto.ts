import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class LoginMailDto {
	@Expose()
	@IsEmail()
	@ApiProperty({ example: 'user@example.com', description: 'User email address' })
	mail!: string;

	@Expose()
	@IsStrongPassword()
	@ApiProperty({ example: 'StrongP@ssw0rd!', description: 'User password' })
	password!: string;
}
