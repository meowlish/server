import { FileController } from './app/presentation/controllers/file.controller';
import { FileService } from './app/services/file.service';
import { config } from './configs/config';
import { minioConfig } from './configs/minio.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@server/logger';
import { NestMinioModule } from 'nestjs-minio';

@Module({
	controllers: [FileController],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		NestMinioModule.registerAsync({ inject: [ConfigService], useFactory: minioConfig }),
		LoggerModule.forRoot({ appName: 'FileModule' }),
	],
	providers: [FileService],
})
export class FileModule {}
