export interface IEntity<T extends IEntity<T>, ID = string> {
	id: ID;

	/**
	 * pre-save validation method for update operation
	 */
	validate(): boolean;

	equals(entity: IEntity<T>): boolean;
}
