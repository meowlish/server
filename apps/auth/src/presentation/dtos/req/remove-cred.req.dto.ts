import { auth } from '@server/generated';
import { IsString } from 'class-validator';

export class RemoveCredDto implements auth.RemoveCredDto {
	@IsString()
	identityId!: string;

	@IsString()
	id!: string;
}
