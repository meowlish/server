import { type ITagRepository, ITagRepositoryToken } from '../../domain/repositories/tag.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
	constructor(@Inject(ITagRepositoryToken) private readonly tagRepository: ITagRepository) {}

	async addTag(name: string, parentId?: string): Promise<void> {
		return await this.tagRepository.addTag(name, parentId);
	}

	async deleteTag(id: string): Promise<void> {
		return await this.tagRepository.deleteTag(id);
	}

	async updateTag(id: string, name: string): Promise<void> {
		return await this.tagRepository.updateTag(id, name);
	}

	async moveTag(id: string, parentId?: string): Promise<void> {
		return await this.tagRepository.moveTag(id, parentId);
	}
}
