import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class GetCredsDto implements auth.GetCredsDto {
	@IsString()
	identityId!: string;
}
