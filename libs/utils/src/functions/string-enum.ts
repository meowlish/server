// Source - https://stackoverflow.com/questions/69160507/typescript-generic-function-with-enums

/**
 * Parses a string into a valid enum value.
 *
 * @typeParam E - The enum value type.
 * @typeParam K - The enum key type.
 *
 * @param enumDef - The enum object to validate against.
 * @param str - The input string to parse.
 *
 * @returns The matching enum value.
 *
 * @throws {TypeError}
 * Thrown when `str` is `undefined` or does not match any enum value.
 *
 * @example
 * enum Status {
 *   ACTIVE = 'active',
 *   INACTIVE = 'inactive',
 * }
 *
 * const status = parseEnum(Status, 'active');
 * // status === Status.ACTIVE
 *
 * parseEnum(Status, 'unknown');
 * // throws TypeError
 */
export function parseEnum<E, K extends string>(
	enumDef: { [key in K]: E },
	str: string | undefined,
): E {
	if (str && Object.values(enumDef).includes(str)) {
		return str as E;
	}
	throw new TypeError(`Expected a valid enum, got: ${str}`);
}
