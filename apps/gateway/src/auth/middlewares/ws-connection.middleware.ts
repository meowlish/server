import { AUTH_CLIENT } from '../../auth-gateway/constants/auth';
import { IEnvVars } from '../../configs/config';
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { AuthPayload, payloadSchema } from '@server/utils';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WsJwtMiddleware implements NestMiddleware {
	private authService!: auth.AuthServiceClient;

	constructor(
		private readonly configService: ConfigService<IEnvVars>,
		@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc,
	) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	async use(req: Request, res: Response, next: NextFunction) {
		try {
			const token = this.extractToken(req);

			if (!token) throw new UnauthorizedException('Missing token');

			const payload = jwt.verify(
				token,
				this.configService.getOrThrow('jwt', { infer: true }).accessSecret,
			) as AuthPayload;

			payloadSchema.parse(payload);

			await lastValueFrom(
				this.authService.validateAccess({
					identityId: payload.sub,
					iat: payload.iat,
				}),
			);

			next();
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
	}

	private extractToken(req: Request): string | null {
		// borrowing from the lib
		return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
	}
}
