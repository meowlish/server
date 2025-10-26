import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { config } from '@configs/config';

import { DatabaseModule } from '@shared/db/database.module';
import { DatabaseService } from '@shared/db/database.service';
import { LoggerModule } from '@shared/logger/logger.module';

import { AuthHandlers } from './app/commands/handlers';
import { AuthController } from './presentation/controllers';

@Module({
	controllers: [AuthController],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
		DatabaseModule,
		LoggerModule,
	],
	providers: [DatabaseService, ...AuthHandlers],
})
export class AuthModule {}
