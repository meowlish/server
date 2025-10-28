import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { IEnvVars } from '@configs/config';

import { AuthService } from '../app/services/auth.service';
import { AuthPayload } from '../types/payload.type';

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private readonly configService: ConfigService<IEnvVars>,
		private readonly authService: AuthService,
	) {
		const env = configService.get('googleOAuth2', { infer: true })!;

		super({
			clientID: env.clientId,
			clientSecret: env.secret,
			// TODO: make callbackurl dynamic
			callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
			scope: ['email', 'profile'],
		});
	}

	validate(accessToken: string, refreshToken: string, profile: Profile): AuthPayload | null {
		// TODO: finish this
		console.log(accessToken, refreshToken, profile);
		return { jti: '', permission: [], roles: [], sub: '' };
	}
}
