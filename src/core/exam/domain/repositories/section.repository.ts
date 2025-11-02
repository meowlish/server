import { Section } from '../entities/section.entity';

export interface ISectionRepository {
	findOne(id: string): Promise<Section | null>;
	findOneInTheSameExamAsSection(id: string, sectionId: string): Promise<Section | null>;
	findOneInTheSameExamAsQuestion(id: string, questionId: string): Promise<Section | null>;
	create(section: Section): Promise<void>;
	update(section: Section): Promise<void>;
	delete(id: string): Promise<void>;
}

export const ISectionRepositoryToken = Symbol('ISectionRepository');
