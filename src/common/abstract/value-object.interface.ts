export interface IValueObject<T extends IValueObject<T>> {
	equals(vo: IValueObject<T>): boolean;
}
