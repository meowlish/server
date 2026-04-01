import { FileModule } from './file.module';
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
	const fileModule = await NestFactory.createMicroservice<MicroserviceOptions>(FileModule, {
		transport: Transport.GRPC,
		options: {
			url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50050}`,
			package: 'file',
			protoPath: join(process.cwd(), 'proto', 'file.proto'),
		},
	});
	useLogger(fileModule);
	await fileModule.listen();
}

bootstrap().catch(console.error);
