import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IEnvVars } from '@configs/config';

import { AuthPayload } from '../types/payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
	constructor(
		private readonly configService: ConfigService<IEnvVars>,
		// private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('jwt', { infer: true })!.refreshSecret,
		});
	}

	validate(payload: AuthPayload) {
		// TODO: finish this
		console.log(payload);
		return payload;
	}
}
