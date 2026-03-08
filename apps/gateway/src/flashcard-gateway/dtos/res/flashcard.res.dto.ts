import { ApiProperty } from '@nestjs/swagger';

export class FlashCardResponseDto {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	question!: string;

	@ApiProperty()
	answer!: string;

	@ApiProperty()
	authorId!: string;

	@ApiProperty({ type: [String] })
	tags!: string[];

	@ApiProperty()
	createdAt!: string;

	@ApiProperty()
	updatedAt!: string;
}

export class ListFlashCardsResponseDto {
	@ApiProperty({ type: [FlashCardResponseDto] })
	flashCards!: FlashCardResponseDto[];

	@ApiProperty()
	totalCount!: number;
}
