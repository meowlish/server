type Constructor<T> = new (payload: T) => T;

export function IntegrationEvent<T extends object>(): Constructor<T> {
	return class {
		constructor(payload: T) {
			Object.assign(this, payload);
		}
	} as Constructor<T>;
}
