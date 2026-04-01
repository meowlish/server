import { AuthModule } from './auth.module';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppLoggerService } from '@server/logger';
import { join } from 'path';
import 'reflect-metadata';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	const authModule = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.GRPC,
		options: {
			url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50050}`,
			package: 'auth',
			protoPath: join(process.cwd(), 'proto', 'auth.proto'),
		},
	});
	useLogger(authModule);
	await authModule.listen();
}

bootstrap().catch(console.error);
