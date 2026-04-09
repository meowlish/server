import { AchievementGatewayController } from './achievement.router.controller';
import { ACHIEVEMENT_CLIENT } from './constants/achievement';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import { Module } from '@nestjs/common';
import { achievement } from '@server/generated';
import { ErrorHandlingGrpcProxy } from '@server/utils';

@Module({
	controllers: [AchievementGatewayController],
	providers: [
		{
			provide: ACHIEVEMENT_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url:
						process.env.ACHIEVEMENT_SERVICE_URL ??
						`${process.env.ACHIEVEMENT_SERVICE_HOST}:${process.env.ACHIEVEMENT_SERVICE_PORT}`,
					package: 'achievement',
					packageDefinition: {
						[`achievement.${achievement.ACHIEVEMENT_SERVICE_NAME}`]:
							achievement.AchievementServiceService,
					} satisfies PackageDefinition,
				}),
		},
	],
	exports: [],
})
export class AchievementGatewayModule {}
