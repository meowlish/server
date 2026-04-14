import { TagNode } from '../read-models/tag/tag-node.read-model';
import { TagTree } from '../read-models/tag/tag-trees.read-model';

export interface ITagRepository {
	addTag(name: string, parentId?: string): Promise<string>;
	deleteTag(id: string): Promise<void>;
	updateTag(id: string, name: string): Promise<void>;
	moveTag(id: string, parentId?: string): Promise<void>;
	getTagTree(): Promise<TagTree[]>;
	getTagList(): Promise<TagNode[]>;
}

export const ITagRepositoryToken = Symbol('ITagRepository');
