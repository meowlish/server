import { IEnvVars } from './config';
import { ConfigService } from '@nestjs/config';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

export const datasrcConfig = (configService: ConfigService<IEnvVars>): PrismaClientOptions => {
	const env = configService.getOrThrow('env', { infer: true });
	const config: PrismaClientOptions = { log: [] };
	if (env === 'production') {
		config.log?.push({ emit: 'stdout', level: 'query' });
	}
	return config;
};
