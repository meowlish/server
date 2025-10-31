import { z } from 'zod/v4';

import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';

export const payloadSchema = z.object({
	sub: z.string(),
	roles: z.array(z.enum(Role)),
	permission: z.array(z.enum(Permission)),
});

export type AuthPayload = z.infer<typeof payloadSchema>;

export type AuthRefreshPayload = Pick<AuthPayload, 'sub'>;

// to create new payload from payload extracted from json
export const recreatePayload = (extractedPayload: AuthPayload) => {
	const parsedPayload = payloadSchema.parse(extractedPayload);
	return parsedPayload;
};

// extract payload for refresh token from access token
export const refreshPayload = (payload: AuthPayload): AuthRefreshPayload => {
	return {
		sub: payload.sub,
	};
};
