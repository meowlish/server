export interface IValueObject<T extends IValueObject<T>> {
	equals(other: any): boolean;
}
