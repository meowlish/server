import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@Exclude()
export class RegisterMailDto {
	@Expose()
	@IsEmail()
	@ApiProperty({ example: 'user@example.com', description: 'User email address' })
	mail!: string;

	@Expose()
	@IsString()
	@ApiProperty({ example: 'JohnDoe', description: 'Username for the new account' })
	username!: string;

	@Expose()
	@IsStrongPassword()
	@ApiProperty({ example: 'StrongP@ssw0rd!', description: 'Strong password for the account' })
	password!: string;
}
