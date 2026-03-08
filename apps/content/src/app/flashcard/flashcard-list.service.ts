import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashCard, FlashCardList, Prisma, PrismaClient } from '@prisma-client/content';
import { blog } from '@server/generated';

@Injectable()
export class FlashcardListService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	private mapToResponse(entity: FlashCardList): blog.FlashCardListResponse {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description || '',
			authorId: entity.authorId,
			isPublic: entity.isPublic,
			tags: entity.tags,
			createdAt: entity.createdAt.toISOString(),
			updatedAt: entity.updatedAt.toISOString(),
		};
	}

	private mapCardToResponse(entity: FlashCard): blog.FlashCardResponse {
		return {
			id: entity.id,
			word: entity.word,
			definition: entity.definition,
			image: entity.image ?? undefined,
			partOfSpeech: entity.partOfSpeech ?? undefined,
			pronunciation: entity.pronunciation ?? undefined,
			examples: entity.examples,
			notes: entity.notes ?? undefined,
			authorId: entity.authorId,
			tags: entity.tags,
			createdAt: entity.createdAt.toISOString(),
			updatedAt: entity.updatedAt.toISOString(),
		};
	}

	async createFlashCardList(
		data: blog.CreateFlashCardListRequest,
	): Promise<blog.FlashCardListResponse> {
		const created = await this.prisma.flashCardList.create({
			data: {
				name: data.name,
				description: data.description,
				authorId: data.authorId,
				isPublic: data.isPublic ?? false,
				tags: data.tags || [],
			},
		});
		return this.mapToResponse(created);
	}

	async getFlashCardList(id: string): Promise<blog.FlashCardListDetailResponse> {
		const entity = await this.prisma.flashCardList.findUnique({
			where: { id },
			include: { cards: true },
		});
		if (!entity) throw new NotFoundException('FlashCardList not found');

		return {
			...this.mapToResponse(entity),
			flashCards: entity.cards.map(card => this.mapCardToResponse(card)),
			totalCards: entity.cards.length,
		};
	}

	async updateFlashCardList(
		data: blog.UpdateFlashCardListRequest,
	): Promise<blog.FlashCardListResponse> {
		const entity = await this.prisma.flashCardList.findUnique({ where: { id: data.id } });
		if (!entity) throw new NotFoundException('FlashCardList not found');

		const updated = await this.prisma.flashCardList.update({
			where: { id: data.id },
			data: {
				name: data.name ?? undefined,
				description: data.description ?? undefined,
				isPublic: data.isPublic ?? undefined,
				tags: data.tags && data.tags.length > 0 ? data.tags : undefined,
			},
		});
		return this.mapToResponse(updated);
	}

	async deleteFlashCardList(id: string): Promise<void> {
		const entity = await this.prisma.flashCardList.findUnique({ where: { id } });
		if (!entity) throw new NotFoundException('FlashCardList not found');

		await this.prisma.flashCardList.delete({ where: { id } });
	}

	async listFlashCardLists(
		data: blog.ListFlashCardListsRequest,
	): Promise<blog.ListFlashCardListsResponse> {
		const page = data.page || 1;
		const limit = data.limit || 10;
		const skip = (page - 1) * limit;

		const where: Prisma.FlashCardListWhereInput = {};
		if (data.authorId) where.authorId = data.authorId;
		if (data.isPublic !== undefined) where.isPublic = data.isPublic;
		if (data.tags && data.tags.length > 0) where.tags = { hasSome: data.tags };

		const [lists, totalCount] = await Promise.all([
			this.prisma.flashCardList.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			this.prisma.flashCardList.count({ where }),
		]);

		return {
			lists: lists.map(list => this.mapToResponse(list)),
			totalCount,
		};
	}

	async addCardToList(data: blog.AddCardToListRequest): Promise<void> {
		const list = await this.prisma.flashCardList.findUnique({ where: { id: data.listId } });
		if (!list) throw new NotFoundException('FlashCardList not found');

		const card = await this.prisma.flashCard.findUnique({ where: { id: data.flashCardId } });
		if (!card) throw new NotFoundException('FlashCard not found');

		await this.prisma.flashCard.update({
			where: { id: data.flashCardId },
			data: { listId: data.listId },
		});
	}

	async removeCardFromList(data: blog.RemoveCardFromListRequest): Promise<void> {
		// Here we could either delete the flashcard or set listId to null (but our schema makes listId required).
		// Since listId is required, "removing a card from list" essentially means deleting the card.
		// If we want to strictly just remove the reference, we need to make listId optional in schema.prisma.
		// Let's assume for this implementation we just delete it from DB if it's removed from its list.
		const card = await this.prisma.flashCard.findFirst({
			where: { id: data.flashCardId, listId: data.listId },
		});
		if (!card) throw new NotFoundException('Card not found in the specified list');

		await this.prisma.flashCard.delete({ where: { id: data.flashCardId } });
	}

	async listCardsInList(data: blog.ListCardsInListRequest): Promise<blog.ListFlashCardsResponse> {
		const page = data.page || 1;
		const limit = data.limit || 10;
		const skip = (page - 1) * limit;

		const [cards, totalCount] = await Promise.all([
			this.prisma.flashCard.findMany({
				where: { listId: data.listId },
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			this.prisma.flashCard.count({ where: { listId: data.listId } }),
		]);

		return {
			flashCards: cards.map(card => this.mapCardToResponse(card)),
			totalCount,
		};
	}
}
