import { GatewayModule } from './gateway.module';
import { INestApplicationContext, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerService } from '@server/logger';

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

	const config = new DocumentBuilder()
		.setTitle('Service API Documentation')
		.setDescription('The API description for Identity Service Architecture')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const documentFactory = () => SwaggerModule.createDocument(gatewayModule, config);
	SwaggerModule.setup('api/docs', gatewayModule, documentFactory);

	await gatewayModule.listen(process.env.PORT ?? 3000, process.env.HOST ?? '127.0.0.1');
}

bootstrap().catch(console.error);
