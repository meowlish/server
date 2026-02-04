export interface IEntity<T extends IEntity<T>, ID = string> {
	id: ID;
	equals(entity: T): boolean;
}
