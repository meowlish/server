import { Module } from '@nestjs/common';
import { LoggerModule } from '@server/logger';

@Module({
	imports: [LoggerModule.forRoot({ appName: 'FileModule' })],
})
export class AchievementModule {}
