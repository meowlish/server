import { IEnvVars } from '../../configs/config';
import { AUTH_CLIENT } from '../constants/auth';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from '@server/generated';
import { Claims } from '@server/utils';
import { AuthRefreshPayload } from '@server/utils';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
	private authService!: auth.AuthServiceClient;

	constructor(
		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
		private readonly configService: ConfigService<IEnvVars>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow('jwt', { infer: true }).refreshSecret,
		});
	}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	async validate(payload: AuthRefreshPayload): Promise<Claims> {
		// TODO: Implement Redis and blacklist tokens here
		const claims = await lastValueFrom(this.authService.getClaims({ identityId: payload.sub }));
		return claims as Claims;
	}
}
