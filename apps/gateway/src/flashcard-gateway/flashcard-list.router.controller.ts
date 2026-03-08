import { FLASHCARD_CLIENT } from './constants/flashcard';
import { AddCardToListDto } from './dtos/req/add-card-to-list.req.dto';
import { CreateFlashCardListDto } from './dtos/req/create-flashcard-list.req.dto';
import { UpdateFlashCardListDto } from './dtos/req/update-flashcard-list.req.dto';
import {
	FlashCardListDetailResponseDto,
	FlashCardListResponseDto,
	ListFlashCardListsResponseDto,
} from './dtos/res/flashcard-list.res.dto';
import { ListFlashCardsResponseDto } from './dtos/res/flashcard.res.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	OnModuleInit,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { blog } from '@server/generated';
import { lastValueFrom } from 'rxjs';

@ApiTags('Flash Card Lists')
@Controller('flash-card-lists')
export class FlashCardListGatewayController implements OnModuleInit {
	private flashCardListService!: blog.FlashCardListServiceClient;

	constructor(@Inject(FLASHCARD_CLIENT) private readonly flashCardClient: ClientGrpc) {}

	onModuleInit() {
		this.flashCardListService = this.flashCardClient.getService<blog.FlashCardListServiceClient>(
			blog.FLASH_CARD_LIST_SERVICE_NAME,
		);
	}

	@Post()
	@ApiBody({ type: CreateFlashCardListDto })
	@ApiCreatedResponse({ type: FlashCardListResponseDto })
	@ApiOperation({ summary: 'Create a new flash card list' })
	async createFlashCardList(@Body() data: CreateFlashCardListDto) {
		return await lastValueFrom(
			this.flashCardListService.createFlashCardList({
				name: data.name,
				description: data.description,
				authorId: data.authorId,
				isPublic: data.isPublic,
				tags: data.tags || [],
			}),
		);
	}

	@Get()
	@ApiOkResponse({ type: ListFlashCardListsResponseDto })
	@ApiOperation({ summary: 'Get a list of flash card lists' })
	@ApiQuery({
		name: 'author_id',
		required: false,
		type: String,
		description: 'Filter by author ID',
	})
	@ApiQuery({
		name: 'is_public',
		required: false,
		type: Boolean,
		description: 'Filter by public status',
	})
	@ApiQuery({
		name: 'tags',
		required: false,
		type: [String],
		description: 'Filter by tags (comma separated or multiple items)',
	})
	@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
	async listFlashCardLists(
		@Query('author_id') authorId?: string,
		@Query('is_public') isPublicStr?: string,
		@Query('tags') tags?: string | string[],
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		const parsedTags =
			Array.isArray(tags) ? tags
			: tags ? [tags]
			: [];

		let isPublic: boolean | undefined = undefined;
		if (isPublicStr === 'true') isPublic = true;
		else if (isPublicStr === 'false') isPublic = false;

		return await lastValueFrom(
			this.flashCardListService.listFlashCardLists({
				authorId: authorId,
				isPublic: isPublic,
				tags: parsedTags,
				page: page ? Number(page) : 1,
				limit: limit ? Number(limit) : 10,
			}),
		);
	}

	@Get(':id')
	@ApiOkResponse({ type: FlashCardListDetailResponseDto })
	@ApiOperation({ summary: 'Get a flash card list by id with its cards' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card List ID' })
	async getFlashCardList(@Param('id') id: string) {
		return await lastValueFrom(this.flashCardListService.getFlashCardList({ id }));
	}

	@Put(':id')
	@ApiBody({ type: UpdateFlashCardListDto })
	@ApiOkResponse({ type: FlashCardListResponseDto })
	@ApiOperation({ summary: 'Update a flash card list by id' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card List ID' })
	async updateFlashCardList(@Param('id') id: string, @Body() data: UpdateFlashCardListDto) {
		return await lastValueFrom(
			this.flashCardListService.updateFlashCardList({
				id,
				name: data.name,
				description: data.description,
				isPublic: data.isPublic,
				tags: data.tags || [],
			}),
		);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'Deleted flash card list successfully' })
	@ApiOperation({ summary: 'Delete a flash card list by id' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card List ID' })
	async deleteFlashCardList(@Param('id') id: string) {
		return await lastValueFrom(this.flashCardListService.deleteFlashCardList({ id }));
	}

	// List items management

	@Get(':listId/cards')
	@ApiOkResponse({ type: ListFlashCardsResponseDto })
	@ApiOperation({ summary: 'Get all cards inside a list (paginated)' })
	@ApiParam({ name: 'listId', type: String, description: 'Flash Card List ID' })
	@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
	async listCardsInList(
		@Param('listId') listId: string,
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		return await lastValueFrom(
			this.flashCardListService.listCardsInList({
				listId,
				page: page ? Number(page) : 1,
				limit: limit ? Number(limit) : 10,
			}),
		);
	}

	@Post(':listId/cards/:cardId')
	@ApiBody({ type: AddCardToListDto, required: false })
	@ApiOkResponse({ description: 'Added card to list successfully' })
	@ApiOperation({ summary: 'Add an existing flash card to a list at a specified position' })
	@ApiParam({ name: 'listId', type: String, description: 'Flash Card List ID' })
	@ApiParam({ name: 'cardId', type: String, description: 'Flash Card ID to add' })
	async addCardToList(
		@Param('listId') listId: string,
		@Param('cardId') cardId: string,
		@Body() data?: AddCardToListDto,
	) {
		return await lastValueFrom(
			this.flashCardListService.addCardToList({
				listId,
				flashCardId: cardId,
				position: data?.position,
			}),
		);
	}

	@Delete(':listId/cards/:cardId')
	@ApiOkResponse({ description: 'Removed card from list successfully' })
	@ApiOperation({ summary: 'Remove a flash card from a list' })
	@ApiParam({ name: 'listId', type: String, description: 'Flash Card List ID' })
	@ApiParam({ name: 'cardId', type: String, description: 'Flash Card ID to remove' })
	async removeCardFromList(@Param('listId') listId: string, @Param('cardId') cardId: string) {
		return await lastValueFrom(
			this.flashCardListService.removeCardFromList({
				listId,
				flashCardId: cardId,
			}),
		);
	}
}
