import { ExamManagementHandlers, ExamPracticeHandlers } from './app/commands/handlers';
import { IntegrationEventPublishers } from './app/events/publishers';
import { TagService } from './app/services/tag.service';
import { bullConfig } from './configs/bullmq.config';
import { config } from './configs/config';
import { rmqPubConfig } from './configs/rmq.pub.config';
import { rmqSubConfig } from './configs/rmq.sub.config';
import { ExamEventHandlers } from './domain/events/handlers';
import { IAttemptRepositoryToken } from './domain/repositories/attempt.repository';
import { IExamRepositoryToken } from './domain/repositories/exam.repository';
import { IFileRepositoryToken } from './domain/repositories/file.repository';
import { IQuestionRepositoryToken } from './domain/repositories/question.repository';
import { ISectionRepositoryToken } from './domain/repositories/section.repository';
import { ITagRepositoryToken } from './domain/repositories/tag.repository';
import {
	AttemptPrismaMapper,
	AttemptPrismaRepository,
} from './infra/repositories/attempt.prisma.repository.impl';
import {
	ExamPrismaMapper,
	ExamPrismaRepository,
} from './infra/repositories/exam.prisma.repository.impl';
import { FilePrismaRepositoryImpl } from './infra/repositories/file.prisma.repository.impl';
import {
	QuestionPrismaMapper,
	QuestionPrismaRepository,
} from './infra/repositories/question.prisma.repository.impl';
import {
	SectionPrismaMapper,
	SectionPrismaRepository,
} from './infra/repositories/section.prisma.repository.impl';
import { TagPrismaRepository } from './infra/repositories/tag.prisma.repository.impl';
import { ExamManagementController } from './presentation/controllers/exam-management.controller';
import { ExamPracticeController } from './presentation/controllers/exam-practice.controller';
import { TagController } from './presentation/controllers/tag.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
	controllers: [ExamManagementController, ExamPracticeController, TagController],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
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
		BullModule.forRootAsync({ inject: [ConfigService], useFactory: bullConfig }),
		BullModule.registerQueue({ name: 'exam' }),
		RabbitMQModule.forRootAsync({ inject: [ConfigService], useFactory: rmqPubConfig }),
		RabbitMQModule.forRootAsync({ inject: [ConfigService], useFactory: rmqSubConfig }),
		LoggerModule.forRoot({ appName: 'ExamModule' }),
	],
	providers: [
		...ExamManagementHandlers,
		...ExamPracticeHandlers,
		...ExamEventHandlers,
		...IntegrationEventPublishers,
		TagService,
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
		AttemptPrismaMapper,
		{
			provide: IAttemptRepositoryToken,
			useClass: AttemptPrismaRepository,
		},
		{
			provide: ITagRepositoryToken,
			useClass: TagPrismaRepository,
		},
		{
			provide: IFileRepositoryToken,
			useClass: FilePrismaRepositoryImpl,
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
