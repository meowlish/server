import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

@Exclude()
export class CreateExamDto {
	@Expose()
	@IsString()
	description!: string;

	@Expose()
	@IsInt()
	@IsPositive()
	duration!: number;

	@Expose()
	@IsString()
	title!: string;
}
