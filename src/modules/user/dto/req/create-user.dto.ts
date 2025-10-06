import { Expose } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	@Expose()
	@IsNotEmpty({ message: 'Username is required' })
	full_name!: string;

	@Expose()
	@IsStrongPassword()
	password!: string;
}
