import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@server/database';
import { PrismaClient } from '@prisma-client/blog';
import { LoggerModule } from '@server/logger';

import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

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
