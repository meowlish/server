import { IEnvVars } from '../../configs/config';
import { AuthenticatedRequest } from '../../types/authenticated-request';
import { AUTH_CLIENT } from '../constants/auth';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from '@server/generated';
import { Claims } from '@server/utils';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
	private authService!: auth.AuthServiceClient;

	constructor(
		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
		private readonly configService: ConfigService<IEnvVars>,
	) {
		const env = configService.getOrThrow('googleOAuth2', { infer: true });

		super({
			clientID: env.clientId,
			clientSecret: env.secret,
			// TODO: make callbackurl dynamic
			callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
			scope: ['email', 'profile'],
			passReqToCallback: true,
		});
	}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	async validate(
		req: AuthenticatedRequest & { user?: Claims },
		accessToken: string,
		refreshToken: string,
		profile: Profile,
	): Promise<Claims> {
		const { id, username } = profile;
		// TODO: If can't find info, create new credential and new identity
		// TODO: If already logged in, add new credential to the identity
		// TODO: id as identifier, loginType is google, secretHash is null
		return await new Promise(() => {
			return { permissions: [], roles: [], sub: '' };
		});
	}
}
