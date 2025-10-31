import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

import { AUTH_SERVICE_NAME, AuthServiceClient } from '@common/generated/auth';
import { Claims } from '@common/utils/types/claims.type';

import { IEnvVars } from '@configs/config';

import { AuthRefreshPayload } from '../../../../common/utils/types/payload.type';
import { AUTH_CLIENT } from '../constants/auth';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
	private authService!: AuthServiceClient;

	constructor(
		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
		private readonly configService: ConfigService<IEnvVars>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('jwt', { infer: true })!.refreshSecret,
		});
	}

	onModuleInit() {
		this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
	}

	async validate(payload: AuthRefreshPayload): Promise<Claims> {
		// TODO: Implement Redis and blacklist tokens here
		const claims = await lastValueFrom(this.authService.getClaims({ identityId: payload.sub }));
		return claims as Claims;
	}
}
