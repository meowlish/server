import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UserModule } from '@modules/user';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/client',
				children: [{ path: '/users', module: UserModule }],
			},
		]),
	],
})
export class RouteModule {}
