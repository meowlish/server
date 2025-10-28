import { AuthPayload, refreshPayload } from '@core/auth/types/payload.type';
import { Tokens } from '@core/auth/types/tokens.type';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(
		@Inject('JWT_ACCESS_TOKEN') private readonly AccessTokenService: JwtService,
		@Inject('JWT_REFRESH_TOKEN') private readonly RefreshTokenService: JwtService,
	) {}

	async generateTokens(payload: AuthPayload, genRefresh: boolean = false): Promise<Tokens> {
		// Only generate refresh token if genRefresh is true
		const [accessToken, refreshToken] = await Promise.all([
			this.generateAccessToken(payload),
			genRefresh ? this.generateRefreshToken(payload) : undefined,
		]);

		return {
			accessToken,
			...(genRefresh && { refreshToken }),
		};
	}

	private async generateAccessToken(payload: AuthPayload): Promise<string> {
		return await this.AccessTokenService.signAsync(payload);
	}

	private async generateRefreshToken(payload: AuthPayload): Promise<string> {
		const token = await this.RefreshTokenService.signAsync(refreshPayload(payload));
		return token;
	}

	async validateRefreshToken(token: string): Promise<AuthPayload> {
		const payload = await this.RefreshTokenService.verifyAsync<AuthPayload>(token);
		return payload;
	}
}
