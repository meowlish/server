import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
	@Expose()
	@Transform(({ value }: { value: bigint }) => value?.toString())
	id!: string;

	@Expose()
	username!: string;
}
