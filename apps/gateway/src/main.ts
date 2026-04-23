import { WsJwtMiddleware } from './auth/middlewares/ws-connection.middleware';
import { GatewayModule } from './gateway.module';
import { AuthenticatedRequest } from './types/authenticated-request';
import { INestApplicationContext, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppLoggerService } from '@server/logger';
import { ClientRequest } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ExtractJwt } from 'passport-jwt';
import 'reflect-metadata';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	const gatewayModule = await NestFactory.create<NestExpressApplication>(GatewayModule, {
		bufferLogs: true,
	});
	gatewayModule.setGlobalPrefix('api');
	gatewayModule.enableVersioning({
		defaultVersion: '1',
		type: VersioningType.URI,
	});
	gatewayModule.enableCors();
	useLogger(gatewayModule);

	// born to modularize
	// forced to initialize proxy on main
	const wsJwtMiddleware = gatewayModule.get(WsJwtMiddleware);
	const onProxyReqWs = function (proxyReq: ClientRequest, req: AuthenticatedRequest) {
		try {
			const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
			if (!token) throw Error('Error while getting bearer token when upgrading to websocket');
			const payload = token.split('.')[1];
			const user = Buffer.from(payload, 'base64url').toString();
			proxyReq.setHeader('X-User', user);
			proxyReq.removeHeader('Authorization');
		} catch (e) {
			console.error(e);
		}
	};

	gatewayModule.use(
		'/socket.io',
		wsJwtMiddleware.use.bind(wsJwtMiddleware),
		createProxyMiddleware({
			target: 'http://localhost:8081',
			changeOrigin: true,
			ws: true,
			on: {
				proxyReqWs: onProxyReqWs,
			},
		}),
	);

	// HTTP API docs
	const docConfig = new DocumentBuilder().setVersion('1').addBearerAuth().build();
	const document = SwaggerModule.createDocument(gatewayModule, docConfig);
	gatewayModule.use(
		'/reference',
		apiReference({
			content: document,
		}),
	);

	await gatewayModule.listen(process.env.PORT ?? 3000, process.env.HOST ?? '127.0.0.1');
}

bootstrap().catch(console.error);
