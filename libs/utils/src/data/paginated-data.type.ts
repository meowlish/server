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

	// eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
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

	// eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
	@IsArray()
	data: T[] = [];
}
