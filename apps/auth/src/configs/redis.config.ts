import { IEnvVars } from './config';
import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

export const redisConfig = (configService: ConfigService<IEnvVars>): RedisModuleOptions => {
	const redisConfig = configService.getOrThrow('redis', { infer: true });
	return {
		config: {
			host: redisConfig.host,
			port: redisConfig.port,
		},
	};
};
