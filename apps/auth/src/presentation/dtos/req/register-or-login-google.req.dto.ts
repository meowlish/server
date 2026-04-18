import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class RegisterOrLoginGoogleDto implements auth.RegisterOrLoginGoogleDto {
	@IsString()
	identifier!: string;

	@IsString()
	username!: string;
}
