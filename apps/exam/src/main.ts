import { ExamModule } from './exam.module';
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
	const examModule = await NestFactory.createMicroservice<MicroserviceOptions>(ExamModule, {
		transport: Transport.GRPC,
		options: {
			url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50050}`,
			package: 'exam',
			protoPath: join(process.cwd(), 'proto', 'exam.proto'),
		},
	});
	useLogger(examModule);
	await examModule.listen();
}

bootstrap().catch(console.error);
