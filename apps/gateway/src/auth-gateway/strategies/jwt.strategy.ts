import { IEnvVars } from '../../configs/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Claims } from '@server/utils';
import { AuthPayload } from '@server/utils';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
	constructor(private readonly configService: ConfigService<IEnvVars>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow('jwt', { infer: true }).accessSecret,
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
