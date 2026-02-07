import { ExamHandlers } from './app/commands/handlers';
import { config } from './configs/config';
import { IExamRepositoryToken } from './domain/repositories/exam.repository';
import { IQuestionRepositoryToken } from './domain/repositories/question.repository';
import { ISectionRepositoryToken } from './domain/repositories/section.repository';
import {
	ExamPrismaMapper,
	ExamPrismaRepository,
} from './infra/repositories/exam.prisma.repository.impl';
import {
	QuestionPrismaMapper,
	QuestionPrismaRepository,
} from './infra/repositories/question.prisma.repository.impl';
import {
	SectionPrismaMapper,
	SectionPrismaRepository,
} from './infra/repositories/section.prisma.repository.impl';
import { ExamController } from './presentation/controllers/exam-management.controller';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma-client/exam';
import { DATABASE_SERVICE, DatabaseModule } from '@server/database';
import { LoggerModule } from '@server/logger';
import { Any2RpcExceptionFilter } from '@server/utils';
import { Http2gRPCExceptionFilter } from '@server/utils';
import { GlobalValidationPipe } from '@server/utils';
import { ClsGuard, ClsModule } from 'nestjs-cls';

@Module({
	controllers: [ExamController],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
		DatabaseModule,
		ClsModule.forRoot({
			global: true,
			guard: { mount: false },
			plugins: [
				new ClsPluginTransactional({
					imports: [DatabaseModule.forRoot(PrismaClient)],
					adapter: new TransactionalAdapterPrisma({
						prismaInjectionToken: DATABASE_SERVICE,
						sqlFlavor: 'postgresql',
					}),
				}),
			],
		}),
		LoggerModule.forRoot({ appName: 'ExamModule' }),
	],
	providers: [
		...ExamHandlers,
		ExamPrismaMapper,
		{
			provide: IExamRepositoryToken,
			useClass: ExamPrismaRepository,
		},
		SectionPrismaMapper,
		{
			provide: ISectionRepositoryToken,
			useClass: SectionPrismaRepository,
		},
		QuestionPrismaMapper,
		{
			provide: IQuestionRepositoryToken,
			useClass: QuestionPrismaRepository,
		},
		{
			provide: APP_GUARD,
			useClass: ClsGuard,
		},
		{
			provide: APP_FILTER,
			useClass: Any2RpcExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: Http2gRPCExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
	],
})
export class ExamModule {}
