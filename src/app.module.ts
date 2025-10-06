import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RouteModule } from '@modules/router';
import { UserModule } from '@modules/user';

import { DatabaseModule } from '@shared/db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './configs';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [Config],
		}),
		DatabaseModule,
		RouteModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
