import { BlogGatewayController } from './blog.router.controller';
import { BLOG_CLIENT } from './constants/blog';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [BlogGatewayController],
	providers: [
		{
			provide: BLOG_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url: process.env.BLOG_SERVICE_URL || '0.0.0.0:50053',
					package: 'blog',
					protoPath: join(process.cwd(), 'proto', 'blog.proto'),
				}),
		},
	],
	exports: [],
})
export class BlogGatewayModule {}
