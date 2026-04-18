import { ClaimsDto } from './claims.res.dto';
import { auth } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class IdentitiesDto implements auth.Identities {
	@Expose()
	@Type(() => ClaimsDto)
	claims!: ClaimsDto[];

	@Expose()
	cursor!: string;
}
