import { type AuthenticatedRequest } from '../types/authenticated-request';
import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ClientRequest } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ExtractJwt } from 'passport-jwt';

@Controller('socket.io')
export class LiveWsGatewayController {
	private proxy = createProxyMiddleware({
		target: 'http://localhost:8081',
		changeOrigin: true,
		ws: true,
		pathRewrite: {
			'^.*\\/socket\\.io': '/socket.io',
		},
		on: {
			proxyReqWs: function (proxyReq: ClientRequest, req: AuthenticatedRequest) {
				try {
					const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
					if (!token) throw Error('Error while getting bearer token when upgrading to websocket');
					const payload = token.split('.')[1];
					const user = JSON.parse(Buffer.from(payload, 'base64url').toString()) as typeof req.user;
					proxyReq.setHeader('Authorization', user.sub);
				} catch (e) {
					console.error(e);
				}
			},
		},
	});

	@All()
	async get(@Req() req: AuthenticatedRequest, @Res() res: Response, @Next() next: NextFunction) {
		await this.proxy(req, res, next);
	}
}
