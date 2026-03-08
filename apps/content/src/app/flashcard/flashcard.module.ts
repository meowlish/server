import { FlashcardListController } from './flashcard-list.controller';
import { FlashcardListService } from './flashcard-list.service';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';
import { Module } from '@nestjs/common';

@Module({
	controllers: [FlashcardController, FlashcardListController],
	providers: [FlashcardService, FlashcardListService],
})
export class FlashcardModule {}
