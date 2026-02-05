import { utilities } from 'nest-winston';
import * as os from 'os';
import * as path from 'path';
import * as winston from 'winston';

const logDir = path.join(os.tmpdir(), '/logs');

export const createWinstonLogger = (appName: string, logLevel = 'info') => {
	return winston.createLogger({
		transports: [
			new winston.transports.Console({
				level: logLevel,
				format: winston.format.combine(
					winston.format.timestamp(),
					utilities.format.nestLike(appName, {
						colors: true,
						prettyPrint: true,
					}),
				),
			}),
			new winston.transports.File({
				dirname: logDir,
				filename: 'app.log',
				level: logLevel,
				format: winston.format.combine(
					winston.format.timestamp(),
					utilities.format.nestLike(appName, {
						colors: false,
						prettyPrint: false,
					}),
				),
			}),
			new winston.transports.File({
				dirname: logDir,
				filename: 'error.log',
				level: 'error',
				format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
			}),
		],
	});
};
