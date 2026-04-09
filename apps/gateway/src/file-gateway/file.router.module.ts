import { FILE_CLIENT } from './constants/file';
import { FileGatewayController } from './file.couter.controller';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import { Module } from '@nestjs/common';
import { file } from '@server/generated';
import { ErrorHandlingGrpcProxy } from '@server/utils';

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
					packageDefinition: {
						[`file.${file.FILE_SERVICE_NAME}`]: file.FileServiceService,
					} satisfies PackageDefinition,
				}),
		},
	],
	exports: [],
})
export class FileGatewayModule {}
