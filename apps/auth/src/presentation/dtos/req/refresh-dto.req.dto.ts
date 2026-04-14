import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class RefreshDto implements auth.RefreshDto {
	@IsString()
	identityId!: string;
}
