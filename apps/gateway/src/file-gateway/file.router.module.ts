import { FILE_CLIENT } from './constants/file';
import { FileGatewayController } from './file.couter.controller';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [FileGatewayController],
	providers: [
		{
			provide: FILE_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url:
						process.env.FILE_SERVICE_URL ??
						`${process.env.FILE_SERVICE_HOST}:${process.env.FILE_SERVICE_PORT}`,
					package: 'file',
					protoPath: join(process.cwd(), 'proto', 'file.proto'),
				}),
		},
	],
	exports: [],
})
export class FileGatewayModule {}
