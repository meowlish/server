import { AuthModule } from '@core/auth/auth.module';
import { INestApplicationContext, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppLoggerService } from '@shared/logger/logger.service';

import { AppModule } from './app.module';

const useLogger = (microservice: INestApplicationContext) => {
	const logger = microservice.get(AppLoggerService);
	microservice.useLogger(logger);
};

async function bootstrap() {
	// auth module
	const authApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.TCP,
		options: { host: '127.0.0.1', port: 4001 },
	});
	useLogger(authApp);
	await authApp.listen();

	// gateway/ main app
	const gateway = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	useLogger(gateway);
	gateway.setGlobalPrefix('api');
	gateway.enableVersioning({
		defaultVersion: '1',
		type: VersioningType.URI,
	});
	gateway.enableCors();
	await gateway.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
