// when retrieving save data
export type AttemptSavedData = {
	responses: { questionId: string; note?: string; isFlagged?: boolean; answers: string[] }[];
	sections: AttemptSectionData[];
	startedAt: Date;
	durationLimit: number;
};

export type AttemptSectionData = {
	id: string;
	name?: string;
	directive: string;
	order: number;
	fileUrls: string[];
	type: string;
	sections: AttemptSectionData[];
	questions: AttemptQuestionData[];
};

type AttemptQuestionData = {
	id: string;
	content: string;
	type: string;
	order: number;
	fileUrls: string[];
	choices: { key: string; content?: string }[];
};
