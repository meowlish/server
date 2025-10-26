import { DeepPartial } from '@common/utils/deep-partial.type';

export interface IRepository<T, ID = string> {
	findById(id: ID): Promise<T | null>;
	create(data: DeepPartial<T>): Promise<T>;
	update(id: ID, data: DeepPartial<T>): Promise<T>;
	delete(id: ID): Promise<void>;
}
