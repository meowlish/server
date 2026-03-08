import { FlashcardService } from './flashcard.service';
import { Controller } from '@nestjs/common';
import { blog, common } from '@server/generated';

@blog.FlashCardServiceControllerMethods()
@Controller()
export class FlashcardController implements blog.FlashCardServiceController {
	constructor(private readonly flashcardService: FlashcardService) {}

	async createFlashCard(data: blog.CreateFlashCardRequest): Promise<blog.FlashCardResponse> {
		return this.flashcardService.createFlashCard(data);
	}

	async getFlashCard(data: blog.GetFlashCardRequest): Promise<blog.FlashCardResponse> {
		return this.flashcardService.getFlashCard(data.id);
	}

	async updateFlashCard(data: blog.UpdateFlashCardRequest): Promise<blog.FlashCardResponse> {
		return this.flashcardService.updateFlashCard(data);
	}

	async deleteFlashCard(data: blog.DeleteFlashCardRequest): Promise<common.Empty> {
		await this.flashcardService.deleteFlashCard(data.id);
		return {};
	}

	async listFlashCards(data: blog.ListFlashCardsRequest): Promise<blog.ListFlashCardsResponse> {
		return this.flashcardService.listFlashCards(data);
	}
}
