import { DeepStringify } from '@server/typing';
import { z } from 'zod/v4';

const dbVarsSchema = z.object({
	host: z.string(),
	port: z.coerce.number().default(5432),
	username: z.string(),
	password: z.string(),
	dbName: z.string(),
});

const objStorageVarsSchema = z.object({
	host: z.string(),
	port: z.coerce.number().default(9000),
	user: z.string(),
	password: z.string(),
});

export const envFileSchema = z.object({
	env: z.union([z.literal('development'), z.literal('production')]),
	database: dbVarsSchema,
	objStorage: objStorageVarsSchema,
});

export type IEnvVars = z.infer<typeof envFileSchema>;

// map your env vars to ConfigService's properties
const loadEnv = (): DeepStringify<IEnvVars> => ({
	env: process.env.NODE_ENV,
	database: {
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		dbName: process.env.POSTGRES_DB,
	},
	objStorage: {
		host: process.env.MINIO_HOST,
		port: process.env.MINIO_PORT,
		user: process.env.MINIO_USER,
		password: process.env.MINIO_PASSWORD,
	},
});

// validate and optionally transform your env variables here

export const config = (): IEnvVars => {
	const env = loadEnv();
	const valResult = envFileSchema.parse(env);
	return valResult;
};

// inject ConfigService<IEnvVars> to load typed env variables
