import { IEntity } from './entity.interface';

/**
 * The most basic entity class with no validation & the simplest equality check
 */
export abstract class BasicEntity<T extends IEntity<T>> implements IEntity<T> {
	private _id!: string;

	get id() {
		return this._id;
	}

	validate(): boolean {
		return true;
	}

	equals(entity: IEntity<T>): boolean {
		return this.id === entity.id;
	}
}
