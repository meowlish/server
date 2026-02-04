import { AuthModule } from './auth.module';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { AppLoggerService } from '@server/logger';
import { join } from 'path';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	const authModule = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.GRPC,
		options: {
			url: '0.0.0.0:50051',
			package: auth.AUTH_SERVICE_NAME,
			protoPath: join(process.cwd(), 'proto', 'auth.proto'),
		},
	});
	useLogger(authModule);
	await authModule.listen();
}

bootstrap().catch(console.error);
