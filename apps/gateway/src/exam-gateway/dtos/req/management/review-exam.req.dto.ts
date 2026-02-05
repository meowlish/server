import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReviewExamDto {
	@Expose()
	@IsString()
	status!: string;
}
