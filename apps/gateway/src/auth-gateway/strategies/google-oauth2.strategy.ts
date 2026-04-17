import { IEnvVars } from '../../configs/config';
import { AUTH_CLIENT } from '../constants/auth';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from '@server/generated';
import { Request } from 'express';
import Redis from 'ioredis';
import { Profile, Strategy } from 'passport-google-oauth20';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GoogleOAuth2Strategy
	extends PassportStrategy(Strategy, 'google')
	implements OnModuleInit
{
	private authService!: auth.AuthServiceClient;
	private readonly redis: Redis;

	constructor(
		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
		private readonly configService: ConfigService<IEnvVars>,
		private readonly redisService: RedisService,
	) {
		const env = configService.getOrThrow('googleOAuth2', { infer: true });

		super({
			clientID: env.clientId,
			clientSecret: env.secret,
			callbackURL: `${configService.getOrThrow('vps', { infer: true }).baseUrl}/api/v1/auth/google/callback`,
			scope: ['email', 'profile'],
			passReqToCallback: true,
		});

		this.redis = this.redisService.getOrThrow();
	}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	async validate(
		req: Request,
		_: string,
		__: string,
		profile: Profile,
	): Promise<auth.Tokens | boolean> {
		const { id } = profile;
		// If already logged in, add new credential to the identity
		if (req.query['state']) {
			const stateKey = req.query['state'] as string;
			const cachedIdentityId = await this.redis.get(stateKey); // parse to Claims
			if (!cachedIdentityId) throw new UnauthorizedException('Expired session');
			await lastValueFrom(
				this.authService.addGoogleCredential({
					identifier: id,
					identityId: cachedIdentityId,
				}),
			);
			return true;
		}
		// If can't find info, create new credential and new identity, else just login
		else
			return await lastValueFrom(
				this.authService.registerOrLoginGoogle({ identifier: id, username: crypto.randomUUID() }),
			);
	}
}
