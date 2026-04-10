import { MinimalExamInfo } from './minimal-exam.read-model';

// exam info, configuration, sections tags
export type DetailedExamInfo = MinimalExamInfo & {
	sections: { id: string; name?: string; questionsCount: number; tags: string[] }[];
};
