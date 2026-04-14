import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class FlagStateDto implements exam.FlagStateDto {
	@Expose()
	state!: boolean;
}
