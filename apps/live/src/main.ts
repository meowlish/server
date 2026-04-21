import { LiveModule } from './live.module';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { live } from '@server/generated';
import { AppLoggerService } from '@server/logger';
import 'reflect-metadata';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	const liveModule = await NestFactory.createMicroservice<MicroserviceOptions>(LiveModule, {
		transport: Transport.GRPC,
		options: {
			url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50050}`,
			package: 'live',
			packageDefinition: {
				[`live.${live.LIVE_SERVICE_NAME}`]: live.LiveServiceService,
			} satisfies PackageDefinition,
		},
	});
	useLogger(liveModule);
	await liveModule.listen();
}

bootstrap().catch(console.error);
