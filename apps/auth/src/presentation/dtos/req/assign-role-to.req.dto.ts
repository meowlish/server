import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class AssignRoleToDto implements auth.AssignRoleToDto {
	@IsString()
	identityId!: string;

	@IsString()
	roleId!: string;
}
