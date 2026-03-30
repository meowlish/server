import { Expose } from 'class-transformer';

export class FlagStateDto {
	@Expose()
	state!: boolean;
}
