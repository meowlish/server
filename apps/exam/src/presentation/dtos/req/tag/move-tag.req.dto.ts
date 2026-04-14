import { exam } from '@server/generated';
import { IsOptional, IsString } from 'class-validator';

export class MoveTagDto implements exam.MoveTagDto {
	@IsOptional()
	@IsString()
	parentId?: string;

	@IsString()
	id!: string;
}
