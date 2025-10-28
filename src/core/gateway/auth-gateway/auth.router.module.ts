import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AUTH_PACKAGE_NAME } from '@common/generated/auth';

import { AuthGatewayController } from './auth.router.controller';
import { AUTH_CLIENT } from './constants/auth';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: AUTH_CLIENT,
				transport: Transport.GRPC,
				options: {
					package: AUTH_PACKAGE_NAME,
					protoPath: join(process.cwd(), 'proto', 'auth.proto'),
				},
			},
		]),
	],
	controllers: [AuthGatewayController],
})
export class AuthGatewayModule {}
