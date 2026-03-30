import { auth } from '@server/generated';
import { Expose } from 'class-transformer';

export class TokensDto implements auth.Tokens {
	@Expose()
	accessToken!: string;

	@Expose()
	refreshToken?: string;
}
