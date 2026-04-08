// detailed attempt review
// (each question's answers + correct answer, points, tag summary)
export type DetailedAttemptReviewData = {
	responses: {
		questionId: string;
		note?: string;
		isFlagged?: boolean;
		answers: string[];
		isCorrect?: boolean;
		score?: number;
	}[];
	sections: SectionReviewData[];
	startedAt: Date;
	durationLimit: number;
};

type SectionReviewData = {
	id: string;
	name?: string;
	directive: string;
	order: number;
	fileUrls: string[];
	type: string;
	sections: SectionReviewData[];
	questions: QuestionReviewData[];
};

type QuestionReviewData = {
	id: string;
	content: string;
	type: string;
	order: number;
	fileUrls: string[];
	choices: { key: string; content?: string; isCorrect: boolean }[];
	tags: string[];
};
