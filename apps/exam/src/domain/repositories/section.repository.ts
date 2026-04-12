import { Section } from '../entities/section.entity';

export interface ISectionRepository {
	findOne(id: string): Promise<Section | null>;
	// if we move to a new section/question, we need to fetch the destination
	findOneInTheSameExamAsSection(id: string, sectionId: string): Promise<Section | null>;
	findOneInTheSameExamAsQuestion(id: string, questionId: string): Promise<Section | null>;
	// if we only move the order, we need to fetch the parent
	getParentSectionOfSection(id: string): Promise<Section | null>;
	// throw error if question doesn't exist
	getParentSectionOfQuestion(id: string): Promise<Section>;
	save(section: Section): Promise<void>;
}

export const ISectionRepositoryToken = Symbol('ISectionRepository');
