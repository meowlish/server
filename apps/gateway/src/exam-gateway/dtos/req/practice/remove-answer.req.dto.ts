import { IsOptional, IsString } from 'class-validator';

export class RemoveAnswerDto {
	@IsOptional()
	@IsString()
	answer?: string;
}
