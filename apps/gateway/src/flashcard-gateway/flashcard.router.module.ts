import { FLASHCARD_CLIENT } from './constants/flashcard';
import { FlashCardListGatewayController } from './flashcard-list.router.controller';
import { FlashCardGatewayController } from './flashcard.router.controller';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [FlashCardGatewayController, FlashCardListGatewayController],
	providers: [
		{
			provide: FLASHCARD_CLIENT,
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
export class FlashCardGatewayModule {}
