import { IEnvVars } from './config';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default (configService: ConfigService<IEnvVars>): JwtModuleOptions => {
	const jwtEnvs = configService.getOrThrow('jwt', { infer: true });

	return {
		secret: jwtEnvs.refreshSecret,
		signOptions: {
			expiresIn: jwtEnvs.refreshTokenExpiration,
		},
	};
};
