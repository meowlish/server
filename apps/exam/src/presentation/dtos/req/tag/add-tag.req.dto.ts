import { exam } from '@server/generated';
import { IsOptional, IsString } from 'class-validator';

export class AddTagDto implements exam.AddTagDto {
	@IsOptional()
	@IsString()
	parentId?: string;

	@IsString()
	name!: string;
}
