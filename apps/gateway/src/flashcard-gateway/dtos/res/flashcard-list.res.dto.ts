import { FlashCardResponseDto } from './flashcard.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FlashCardListResponseDto {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	name!: string;

	@ApiProperty()
	description!: string;

	@ApiProperty()
	authorId!: string;

	@ApiProperty()
	isPublic!: boolean;

	@ApiProperty({ type: [String] })
	tags!: string[];

	@ApiProperty()
	createdAt!: string;

	@ApiProperty()
	updatedAt!: string;
}

export class FlashCardListDetailResponseDto extends FlashCardListResponseDto {
	@ApiProperty({ type: [FlashCardResponseDto] })
	flashCards!: FlashCardResponseDto[];

	@ApiProperty()
	totalCards!: number;
}

export class ListFlashCardListsResponseDto {
	@ApiProperty({ type: [FlashCardListResponseDto] })
	lists!: FlashCardListResponseDto[];

	@ApiProperty()
	totalCount!: number;
}
