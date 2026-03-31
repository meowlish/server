import { IsOptional, IsString } from 'class-validator';

export class MoveTagDto {
	@IsOptional()
	@IsString()
	parentId?: string;
}
