export type DeepStringify<T> =
	T extends (...args: any[]) => any ? never
	: T extends readonly any[] ? string
	: T extends object ? { [K in keyof T]?: DeepStringify<T[K]> }
	: string;
