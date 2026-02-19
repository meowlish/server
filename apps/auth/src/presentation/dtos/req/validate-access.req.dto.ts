import { auth } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ValidateAccessDto implements auth.ValidateAccessDto {
	@Expose()
	@IsString()
	identityId!: string;

	@Expose()
	@IsNumber()
	iat!: number;
}
