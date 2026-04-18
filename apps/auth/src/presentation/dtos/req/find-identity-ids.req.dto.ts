import { auth } from '@server/generated';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindIdentityIdsDto implements auth.FindIdentityIdsDto {
	@IsOptional()
	@IsString()
	usernameOrCredIdentifier?: string;

	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	limit?: number;
}
