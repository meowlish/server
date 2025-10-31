// import { Metadata } from '@grpc/grpc-js';
// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { type ClientGrpc } from '@nestjs/microservices';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-google-oauth20';

// import { AUTH_SERVICE_NAME, AuthServiceClient } from '@common/generated/auth';
// import { Claims } from '@common/utils/types/claims.type';

// import { IEnvVars } from '@configs/config';

// import { AuthService } from '../../../auth/app/services/auth.service';
// import { AUTH_CLIENT } from '../constants/auth';

// @Injectable()
// export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
// 	private authService!: AuthServiceClient;

// 	constructor(
// 		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
// 		private readonly configService: ConfigService<IEnvVars>,
// 		private readonly authService: AuthService,
// 	) {
// 		const env = configService.get('googleOAuth2', { infer: true })!;

// 		super({
// 			clientID: env.clientId,
// 			clientSecret: env.secret,
// 			// TODO: make callbackurl dynamic
// 			callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
// 			scope: ['email', 'profile'],
// 		});
// 	}

// 	onModuleInit() {
// 		this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
// 	}

// 	validate(accessToken: string, refreshToken: string, profile: Profile): Claims | null {
// 		// TODO: finish this
// 		console.log(accessToken, refreshToken, profile);
// 		const metadata = new Metadata();

// 		return { permission: [], roles: [], sub: '' };
// 	}
// }
