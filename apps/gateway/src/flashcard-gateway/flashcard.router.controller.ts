import { FLASHCARD_CLIENT } from './constants/flashcard';
import { CreateFlashCardDto } from './dtos/req/create-flashcard.req.dto';
import { UpdateFlashCardDto } from './dtos/req/update-flashcard.req.dto';
import { FlashCardResponseDto, ListFlashCardsResponseDto } from './dtos/res/flashcard.res.dto';
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

@ApiTags('Flash Cards')
@Controller()
export class FlashCardGatewayController implements OnModuleInit {
	private flashCardService!: blog.FlashCardServiceClient;

	constructor(@Inject(FLASHCARD_CLIENT) private readonly flashCardClient: ClientGrpc) {}

	onModuleInit() {
		this.flashCardService = this.flashCardClient.getService<blog.FlashCardServiceClient>(
			blog.FLASH_CARD_SERVICE_NAME,
		);
	}

	@Post('flash-card-lists/:listId/cards')
	@ApiBody({ type: CreateFlashCardDto })
	@ApiCreatedResponse({ type: FlashCardResponseDto })
	@ApiOperation({ summary: 'Create a new flash card within a specific list' })
	@ApiParam({ name: 'listId', type: String, description: 'ID of the flash card list' })
	async createFlashCard(@Param('listId') listId: string, @Body() data: CreateFlashCardDto) {
		return await lastValueFrom(
			this.flashCardService.createFlashCard({
				word: data.word,
				definition: data.definition,
				image: data.image,
				partOfSpeech: data.partOfSpeech,
				pronunciation: data.pronunciation,
				examples: data.examples || [],
				notes: data.notes,
				authorId: data.authorId,
				tags: data.tags || [],
				listId: listId,
			}),
		);
	}

	@Get('flash-cards')
	@ApiOkResponse({ type: ListFlashCardsResponseDto })
	@ApiOperation({ summary: 'Get a list of flash cards' })
	@ApiQuery({
		name: 'author_id',
		required: false,
		type: String,
		description: 'Filter by author ID',
	})
	@ApiQuery({
		name: 'tags',
		required: false,
		type: [String],
		description: 'Filter by tags (comma separated or multiple items)',
	})
	@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
	async listFlashCards(
		@Query('author_id') authorId?: string,
		@Query('tags') tags?: string | string[],
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		const parsedTags =
			Array.isArray(tags) ? tags
			: tags ? [tags]
			: [];
		return await lastValueFrom(
			this.flashCardService.listFlashCards({
				authorId: authorId,
				tags: parsedTags,
				page: page ? Number(page) : 1,
				limit: limit ? Number(limit) : 10,
			}),
		);
	}

	@Get('flash-cards/:id')
	@ApiOkResponse({ type: FlashCardResponseDto })
	@ApiOperation({ summary: 'Get a flash card by id' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card ID' })
	async getFlashCard(@Param('id') id: string) {
		return await lastValueFrom(this.flashCardService.getFlashCard({ id }));
	}

	@Put('flash-cards/:id')
	@ApiBody({ type: UpdateFlashCardDto })
	@ApiOkResponse({ type: FlashCardResponseDto })
	@ApiOperation({ summary: 'Update a flash card by id' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card ID' })
	async updateFlashCard(@Param('id') id: string, @Body() data: UpdateFlashCardDto) {
		return await lastValueFrom(
			this.flashCardService.updateFlashCard({
				id,
				word: data.word,
				definition: data.definition,
				image: data.image,
				partOfSpeech: data.partOfSpeech,
				pronunciation: data.pronunciation,
				examples: data.examples || [],
				notes: data.notes,
				tags: data.tags || [],
			}),
		);
	}

	@Delete('flash-cards/:id')
	@ApiOkResponse({ description: 'Deleted flash card successfully' })
	@ApiOperation({ summary: 'Delete a flash card by id' })
	@ApiParam({ name: 'id', type: String, description: 'Flash Card ID' })
	async deleteFlashCard(@Param('id') id: string) {
		return await lastValueFrom(this.flashCardService.deleteFlashCard({ id }));
	}
}
