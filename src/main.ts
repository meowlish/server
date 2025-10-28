import { AuthModule } from '@core/auth/auth.module';
import { INestApplicationContext, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AUTH_PACKAGE_NAME } from '@common/generated/auth';

import { AppLoggerService } from '@shared/logger/logger.service';

import { GatewayModule } from './core/gateway/gateway.module';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	// auth module
	const authModule = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.GRPC,
		options: {
			package: AUTH_PACKAGE_NAME,
			protoPath: join(process.cwd(), 'proto', 'auth.proto'),
		},
	});
	useLogger(authModule);
	await authModule.listen();

	// gateway
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
	await gatewayModule.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
