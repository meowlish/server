/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DynamicModule, Module, OnModuleDestroy, OnModuleInit, Provider } from '@nestjs/common';

export const DATABASE_SERVICE = Symbol('DATABASE_SERVICE');

@Module({})
export class DatabaseModule {
	static forRoot<T extends new (...args: any[]) => any>(PrismaClientClass: T): DynamicModule {
		class AutoPrismaClient extends PrismaClientClass implements OnModuleInit, OnModuleDestroy {
			async onModuleInit() {
				if (super['$connect']) {
					await (this as any).$connect();
				}
			}

			async onModuleDestroy() {
				if (super['$disconnect']) {
					await (this as any).$disconnect();
				}
			}
		}

		const provider: Provider = {
			provide: DATABASE_SERVICE,
			useClass: AutoPrismaClient,
		};

		return {
			module: DatabaseModule,
			providers: [provider],
			exports: [DATABASE_SERVICE],
		};
	}
}
