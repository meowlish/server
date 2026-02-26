import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RegisterMailDto {
	@ApiProperty({ example: 'user@example.com', description: 'User email address' })
	@Expose()
	@IsEmail()
	mail!: string;

	@ApiProperty({ example: 'JohnDoe', description: 'Username for the new account' })
	@Expose()
	@IsString()
	username!: string;

	@ApiProperty({ example: 'StrongP@ssw0rd!', description: 'Strong password for the account' })
	@Expose()
	@IsStrongPassword()
	password!: string;
}
