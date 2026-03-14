import { AchievementModule } from './achievement.module';
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
	const achievementModule = await NestFactory.createMicroservice<MicroserviceOptions>(
		AchievementModule,
		{
			transport: Transport.GRPC,
			options: {
				url: `${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? 50050}`,
				package: 'achievement',
				protoPath: join(process.cwd(), 'proto', 'achievement.proto'),
			},
		},
	);
	useLogger(achievementModule);
	await achievementModule.listen();
}

bootstrap().catch(console.error);
