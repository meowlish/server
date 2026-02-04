import { IsArray, IsInt, IsString } from 'class-validator';

export class OffsetPaginatedData<T> {
	constructor(page: number, limit: number, data: T[]) {
		this.page = page;
		this.data = data;
		this.limit = limit;
	}

	@IsInt()
	page = 1;

	@IsInt()
	limit = 10;

	@IsArray()
	data: T[] = [];
}

export class CursorPaginatedData<T> {
	constructor(cursor: string, data: T[]) {
		this.cursor = cursor;
		this.data = data;
	}

	@IsString()
	cursor: string;

	@IsArray()
	data: T[] = [];
}
