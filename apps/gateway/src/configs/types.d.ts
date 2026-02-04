/// <reference types="node" />

declare const NODE_ENV: 'development' | 'production';
declare const PORT: string;

declare const POSTGRES_PORT: string;
declare const POSTGRES_USER: string;
declare const POSTGRES_PASSWORD: string;
declare const POSTGRES_DB: string;
declare const POSTGRES_URL: string;

declare const ADMINER_PORT: string;

declare const PASSWORD_HASH_ALG: string;

declare const JWT_SECRET: string;
declare const JWT_REFRESH_SECRET: string;
declare const JWT_ACCESS_TOKEN_EXPIRATION: string;
declare const JWT_REFRESH_TOKEN_EXPIRATION: string;

declare const GOOGLE_OA2_CLIENT_ID: string;
declare const GOOGLE_OA2_CLIENT_SECRET: string;

declare const LOG_LEVEL: string;
