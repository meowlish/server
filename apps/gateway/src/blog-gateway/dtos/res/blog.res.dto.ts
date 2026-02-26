import { ApiProperty } from '@nestjs/swagger';

export class BlogResponseDto {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	title!: string;

	@ApiProperty()
	content!: string;

	@ApiProperty()
	authorId!: string;

	@ApiProperty({ type: [String] })
	tags!: string[];

	@ApiProperty()
	createdAt!: string;

	@ApiProperty()
	updatedAt!: string;
}

export class ListBlogsResponseDto {
	@ApiProperty({ type: [BlogResponseDto] })
	blogs!: BlogResponseDto[];

	@ApiProperty()
	totalCount!: number;
}
