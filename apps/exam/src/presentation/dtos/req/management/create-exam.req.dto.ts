import { exam } from '@server/generated';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateExamDto implements exam.CreateExamDto {
	@IsString()
	createdBy!: string;

	@IsString()
	description!: string;

	@IsInt()
	@IsPositive()
	duration!: number;

	@IsString()
	title!: string;
}
