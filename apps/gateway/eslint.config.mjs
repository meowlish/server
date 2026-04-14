import baseConfig from '../../eslint.config.mjs';
import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';

export default [
	...baseConfig,
	...eslintNestJs.configs.flatRecommended.map(config => ({
		...config,
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.cts',
			'**/*.mts',
			'**/*.js',
			'**/*.jsx',
			'**/*.cjs',
			'**/*.mjs',
		],
		ignores: ['**/*.config.{js,ts,mjs,cjs,cts}', '**/generated/**', '**/dist', '**/out-tsc'],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			'@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
		},
	})),
	{
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.cts',
			'**/*.mts',
			'**/*.js',
			'**/*.jsx',
			'**/*.cjs',
			'**/*.mjs',
		],
		ignores: ['**/*.config.{js,ts,mjs,cjs,cts}', '**/generated/**', '**/dist', '**/out-tsc'],
		languageOptions: {
			parserOptions: {
				projectService: false,
				project: ['apps/gateway/tsconfig.*?.json'],
			},
		},
	},
];
