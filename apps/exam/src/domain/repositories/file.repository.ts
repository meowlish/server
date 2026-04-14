export interface IFileRepository {
	getAndRemoveDeletedFileIds(): Promise<string[]>;
}

export const IFileRepositoryToken = Symbol('IFileRepository');
