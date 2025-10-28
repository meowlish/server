// Source - https://stackoverflow.com/questions/69160507/typescript-generic-function-with-enums

export function parseEnum<E, K extends string>(
	enumDef: { [key in K]: E },
	str: string | undefined,
): E {
	if (str && str in enumDef) {
		return enumDef[str as K] as E;
	}
	throw new TypeError(`Expected a valid enum key, got: ${str}`);
}
