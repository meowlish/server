import type { Config } from 'jest';

export default (): Config => {
	return {
		verbose: true,
		preset: 'ts-jest',
		moduleFileExtensions: ['js', 'json', 'ts'],
		rootDir: 'src',
		testRegex: '.*\\.spec\\.ts$',
		transform: {
			'^.+\\.(t|j)s$': 'ts-jest',
		},
		collectCoverageFrom: ['**/*.(t|j)s'],
		coverageDirectory: '../coverage',
		testEnvironment: 'node',
		moduleNameMapper: {
			'^@app/(.*)$': '<rootDir>/app/$1',
			'^@common/(.*)$': '<rootDir>/common/$1',
			'^@configs/(.*)$': '<rootDir>/configs/$1',
			'^@core/(.*)$': '<rootDir>/core/$1',
			'^@shared/(.*)$': '<rootDir>/shared/$1',
			'^@app$': '<rootDir>/app',
			'^@common$': '<rootDir>/common',
			'^@configs$': '<rootDir>/configs',
			'^@core$': '<rootDir>/core',
			'^@shared$': '<rootDir>/shared',
		},
	};
};
