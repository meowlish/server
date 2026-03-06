import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateExamDto {
	@IsString()
	description!: string;

	@IsInt()
	@IsPositive()
	duration!: number;

	@IsString()
	title!: string;
}
