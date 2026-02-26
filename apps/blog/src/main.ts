import { BlogModule } from './app/blog.module';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppLoggerService } from '@server/logger';
import { join } from 'path';

const useLogger = (module: INestApplicationContext) => {
	const logger = module.get(AppLoggerService);
	module.useLogger(logger);
};

async function bootstrap() {
	const blogModule = await NestFactory.createMicroservice<MicroserviceOptions>(BlogModule, {
		transport: Transport.GRPC,
		options: {
			url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50053}`,
			package: 'blog',
			protoPath: join(process.cwd(), 'proto', 'blog.proto'),
		},
	});
	useLogger(blogModule);
	await blogModule.listen();
}

bootstrap().catch(console.error);
