import { ApiProperty } from '@nestjs/swagger';

export class OffsetPaginatedData<T> {
	@ApiProperty({
		description: 'Current page number (1-based)',
		example: 1,
	})
	page!: number;

	@ApiProperty({
		description: 'List of items in the current page',
		isArray: true,
	})
	items!: T[];
}

export class CursorPaginatedData<T> {
	@ApiProperty({
		description: 'Cursor pointing to the next page',
		example: 'eyJpZCI6IjEyMyJ9',
	})
	cursor!: string;

	@ApiProperty({
		description: 'List of items for this cursor',
		isArray: true,
	})
	items!: T[];
}
