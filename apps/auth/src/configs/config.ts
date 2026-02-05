import { DeepStringify } from '@server/utils';
import { z } from 'zod/v4';

const dbVarsSchema = z.object({
	port: z.coerce.number().default(5432),
	username: z.string(),
	password: z.string(),
	dbName: z.string(),
});

const jwtVarsSchema = z.object({
	accessSecret: z.string(),
	refreshSecret: z.string(),
	accessTokenExpiration: z.coerce.number().default(15 * 60), // 15 minutes in seconds
	refreshTokenExpiration: z.coerce.number().default(7 * 24 * 60 * 60), // 7 days in seconds
});

const googleOAuth2VarsSchema = z.object({
	clientId: z.string(),
	secret: z.string(),
});

export const envFileSchema = z.object({
	env: z.union([z.literal('development'), z.literal('production')]),
	database: dbVarsSchema,
	jwt: jwtVarsSchema,
	googleOAuth2: googleOAuth2VarsSchema,
});

export type IEnvVars = z.infer<typeof envFileSchema>;

// map your env vars to ConfigService's properties
const loadEnv = (): DeepStringify<IEnvVars> => ({
	env: process.env.NODE_ENV,
	database: {
		port: process.env.POSTGRES_PORT,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		dbName: process.env.POSTGRES_DB,
	},
	jwt: {
		accessSecret: process.env.JWT_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
		accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
		refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
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
