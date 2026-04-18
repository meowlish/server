import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class AddGoogleCredDto implements auth.AddGoogleCredDto {
	@IsString()
	identifier!: string;

	@IsString()
	identityId!: string;
}
