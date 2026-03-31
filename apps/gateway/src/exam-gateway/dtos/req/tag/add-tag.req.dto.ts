import { IsOptional, IsString } from 'class-validator';

export class AddTagDto {
	@IsOptional()
	@IsString()
	parentId?: string;

	@IsString()
	name!: string;
}
