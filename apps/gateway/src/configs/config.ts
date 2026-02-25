import { DeepStringify } from '@server/utils';
import { z } from 'zod/v4';

const jwtVarsSchema = z.object({
	accessSecret: z.string(),
	refreshSecret: z.string(),
});

const googleOAuth2Schema = z.object({
	clientId: z.string(),
	secret: z.string(),
});

export const envFileSchema = z.object({
	env: z.union([z.literal('development'), z.literal('production')]),
	jwt: jwtVarsSchema,
	googleOAuth2: googleOAuth2Schema,
});

export type IEnvVars = z.infer<typeof envFileSchema>;

// map your env vars to ConfigService's properties
const loadEnv = (): DeepStringify<IEnvVars> => ({
	env: process.env.NODE_ENV,
	jwt: {
		accessSecret: process.env.JWT_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
	},
	googleOAuth2: {
		clientId: process.env.GOOGLE_OA2_CLIENT_ID,
		secret: process.env.GOOGLE_OA2_CLIENT_SECRET,
	},
});

// validate and optionally transform your env variables here

export const config = (): IEnvVars => {
	const env = loadEnv();
	const valResult = envFileSchema.parse(env);
	return valResult;
};

// inject ConfigService<IEnvVars> to load typed env variables
