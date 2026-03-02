import { IEnvVars } from '../../configs/config';
import { Tokens } from '../../types/tokens.type';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Claims } from '@server/utils';
import Redis from 'ioredis';

@Injectable()
export class TokenService {
	private readonly redis: Redis;

	constructor(
		@Inject('JWT_ACCESS_TOKEN') private readonly AccessTokenService: JwtService,
		@Inject('JWT_REFRESH_TOKEN') private readonly RefreshTokenService: JwtService,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService<IEnvVars>,
	) {
		this.redis = this.redisService.getOrThrow();
	}

	async generateTokens(claims: Claims, genRefresh = false): Promise<Tokens> {
		// Only generate refresh token if genRefresh is true
		const [accessToken, refreshToken] = await Promise.all([
			this.generateAccessToken(claims),
			genRefresh ? this.generateRefreshToken(claims) : undefined,
		]);

		return {
			accessToken: accessToken,
			...(genRefresh && { refreshToken: refreshToken }),
		};
	}

	private async generateAccessToken(claims: Claims): Promise<string> {
		return await this.AccessTokenService.signAsync({ ...claims, jti: crypto.randomUUID() });
	}

	private async generateRefreshToken(claims: Claims): Promise<string> {
		const token = await this.RefreshTokenService.signAsync({
			sub: claims.sub,
			jti: crypto.randomUUID(),
		});
		return token;
	}

	private key(userId: string): string {
		return `jwt:blacklist:user:${userId}`;
	}

	async revokeUser(userId: string): Promise<void> {
		await this.redis.setex(
			this.key(userId),
			this.configService.getOrThrow('jwt', { infer: true }).refreshTokenExpiration,
			Math.floor(Date.now() / 1000),
		);
	}

	async isTokenRevoked(userId: string, tokenIat: number): Promise<boolean> {
		const revokedAt = await this.redis.get(this.key(userId));
		if (!revokedAt) return false;
		return tokenIat < Number(revokedAt);
	}
}
