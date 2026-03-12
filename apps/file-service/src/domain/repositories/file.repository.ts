import { FileMetadata } from '../../types/file-metadata.type';

export interface IFileRepository {
	// returns id
	create(fileMetadata: FileMetadata): Promise<string>;
}

export const IFileRepositoryToken = Symbol('IFileRepository');
