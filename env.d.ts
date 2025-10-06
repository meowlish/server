/// <reference types="node" />

// Declare env variables here.

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production';
		readonly PORT: number;
		readonly POSTGRES_PORT: number;
		readonly POSTGRES_USER: string;
		readonly POSTGRES_PASSWORD: string;
		readonly POSTGRES_DB: string;
		readonly POSTGRES_URL: string;
		readonly ADMINER_PORT: number;
		readonly PASSWORD_HASH_ALG: string;
		readonly JWT_SECRET: string;
		readonly JWT_REFRESH_SECRET: string;
		readonly JWT_ACCESS_TOKEN_EXPIRATION: number;
		readonly JWT_REFRESH_TOKEN_EXPIRATION: number;
		readonly GOOGLE_OA2_CLIENT_ID: string;
		readonly GOOGLE_OA2_CLIENT_SECRET: string;
	}
}
