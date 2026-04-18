import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class UpdateIdentityDto implements auth.UpdateIdentityDto {
	@IsString()
	identityId!: string;

	@IsString()
	username!: string;
}
