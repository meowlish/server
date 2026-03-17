import { DeepStringify } from '@server/typing';
import { z } from 'zod/v4';

const jwtVarsSchema = z.object({
	accessSecret: z.string(),
	refreshSecret: z.string(),
});

const googleOAuth2Schema = z.object({
	clientId: z.string(),
	secret: z.string(),
});

export const servicesSchema = z.object({
	auth: z.object({
		port: z.coerce.number(),
		host: z.string(),
	}),
	exam: z.object({
		port: z.coerce.number(),
		host: z.string(),
	}),
	file: z.object({
		port: z.coerce.number(),
		host: z.string(),
	}),
	achievement: z.object({
		port: z.coerce.number(),
		host: z.string(),
	}),
});

export const envFileSchema = z.object({
	env: z.union([z.literal('development'), z.literal('production')]),
	jwt: jwtVarsSchema,
	googleOAuth2: googleOAuth2Schema,
	microservicesConnection: servicesSchema,
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
	microservicesConnection: {
		auth: {
			port: process.env.AUTH_SERVICE_PORT,
			host: process.env.AUTH_SERVICE_HOST,
		},
		exam: {
			port: process.env.EXAM_SERVICE_PORT,
			host: process.env.EXAM_SERVICE_HOST,
		},
		file: {
			port: process.env.FILE_SERVICE_PORT,
			host: process.env.FILE_SERVICE_HOST,
		},
		achievement: {
			port: process.env.ACHIEVEMENT_SERVICE_PORT,
			host: process.env.ACHIEVEMENT_SERVICE_HOST,
		},
	},
});

// validate and optionally transform your env variables here

export const config = (): IEnvVars => {
	const env = loadEnv();
	const valResult = envFileSchema.parse(env);
	return valResult;
};

// inject ConfigService<IEnvVars> to load typed env variables
