import { FlashcardListService } from './flashcard-list.service';
import { Controller } from '@nestjs/common';
import { blog, common } from '@server/generated';

@blog.FlashCardListServiceControllerMethods()
@Controller()
export class FlashcardListController implements blog.FlashCardListServiceController {
	constructor(private readonly flashcardListService: FlashcardListService) {}

	async createFlashCardList(
		data: blog.CreateFlashCardListRequest,
	): Promise<blog.FlashCardListResponse> {
		return this.flashcardListService.createFlashCardList(data);
	}

	async getFlashCardList(
		data: blog.GetFlashCardListRequest,
	): Promise<blog.FlashCardListDetailResponse> {
		return this.flashcardListService.getFlashCardList(data.id);
	}

	async updateFlashCardList(
		data: blog.UpdateFlashCardListRequest,
	): Promise<blog.FlashCardListResponse> {
		return this.flashcardListService.updateFlashCardList(data);
	}

	async deleteFlashCardList(data: blog.DeleteFlashCardListRequest): Promise<common.Empty> {
		await this.flashcardListService.deleteFlashCardList(data.id);
		return {};
	}

	async listFlashCardLists(
		data: blog.ListFlashCardListsRequest,
	): Promise<blog.ListFlashCardListsResponse> {
		return this.flashcardListService.listFlashCardLists(data);
	}

	async addCardToList(data: blog.AddCardToListRequest): Promise<common.Empty> {
		await this.flashcardListService.addCardToList(data);
		return {};
	}

	async removeCardFromList(data: blog.RemoveCardFromListRequest): Promise<common.Empty> {
		await this.flashcardListService.removeCardFromList(data);
		return {};
	}

	async listCardsInList(data: blog.ListCardsInListRequest): Promise<blog.ListFlashCardsResponse> {
		return this.flashcardListService.listCardsInList(data);
	}
}
