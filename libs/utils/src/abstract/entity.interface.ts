export interface IEntity<T extends IEntity<T, ID>, ID = string> {
	id: ID;
}
