import { FileMetadata } from '../../types/file-metadata.type';

export interface IFileRepository {
	// returns id
	create(fileMetadata: FileMetadata): Promise<string>;
	incrementRef(ids: string[], count?: number): Promise<void>;
	decrementRef(ids: string[], count?: number): Promise<void>;
	remove(ids: string[]): Promise<void>;
	getOrphanedFiles(): Promise<{ id: string; updatedAt: Date }[]>;
}

export const IFileRepositoryToken = Symbol('IFileRepository');
