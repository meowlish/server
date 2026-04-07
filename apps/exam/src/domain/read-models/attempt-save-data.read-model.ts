import { QuestionType } from '../../enums/question-type.enum';
import { SectionType } from '../../enums/section-type.enum';

// when retrieving save data
export type AttemptSavedData = {
	responses: { questionId: string; note?: string; isFlagged?: boolean; answers: string[] }[];
	sections: AttemptSectionData[];
	startedAt: Date;
	durationLimit: number;
};

type AttemptSectionData = {
	id: string;
	name: string;
	directive: string;
	order: number;
	fileUrls: string[];
} & (
	| { type: SectionType.Section; sections: AttemptSectionData[] }
	| { type: SectionType.Question; questions: AttemptQuestionData[] }
);

type AttemptQuestionData = {
	id: string;
	content: string;
	type: QuestionType;
	order: number;
	fileUrls: string[];
	choices: { key: string; content: string }[];
};
