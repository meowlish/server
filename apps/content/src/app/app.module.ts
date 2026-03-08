import { BlogModule } from './blog/blog.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [BlogModule, FlashcardModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
