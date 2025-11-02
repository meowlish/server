export interface IValueObject<T extends IValueObject<T>> {
	equals(vo: T): boolean;
}
