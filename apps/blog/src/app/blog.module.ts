import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma-client/blog';
import { DatabaseModule } from '@server/database';
import { LoggerModule } from '@server/logger';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.development', '.env'],
		}),
		DatabaseModule.forRoot(PrismaClient),
		LoggerModule.forRoot({ appName: 'BlogModule' }),
	],
	controllers: [BlogController],
	providers: [BlogService],
})
export class BlogModule {}
