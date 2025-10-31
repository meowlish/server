import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Claims } from '@common/utils/types/claims.type';

import { IEnvVars } from '@configs/config';

import { AuthPayload } from '../../../../common/utils/types/payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
	constructor(private readonly configService: ConfigService<IEnvVars>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('jwt', { infer: true })!.accessSecret,
		});
	}

	validate(payload: AuthPayload): Claims {
		// TODO: Implement Redis and blacklist tokens here
		return {
			sub: payload.sub,
			permissions: payload.permission,
			roles: payload.roles,
		};
	}
}
