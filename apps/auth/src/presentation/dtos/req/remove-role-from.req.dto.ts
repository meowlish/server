import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class RemoveRoleFromDto implements auth.RemoveRoleFromDto {
	@IsString()
	identityId!: string;

	@IsString()
	roleId!: string;
}
