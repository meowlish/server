import { IEnvVars } from './config';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default (configService: ConfigService<IEnvVars>): JwtModuleOptions => ({
	secret: configService.getOrThrow('jwt', { infer: true }).refreshSecret,
	signOptions: {
		expiresIn: configService.getOrThrow('jwt', { infer: true }).refreshTokenExpiration,
	},
});
