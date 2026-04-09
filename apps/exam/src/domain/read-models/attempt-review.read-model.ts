// detailed attempt review
// (each question's answers + correct answer, points, tag summary)
export type DetailedAttemptReviewData = {
	responses: {
		questionId: string;
		note?: string;
		isFlagged?: boolean;
		answers: string[];
		isCorrect?: boolean;
		additionalData?: string;
	}[];
	sections: SectionReviewData[];
	startedAt: Date;
	endedAt: Date;
	durationLimit: number;
	totalPoints?: number;
};

export type SectionReviewData = {
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
	points: number;
	type: string;
	order: number;
	fileUrls: string[];
	choices: { key: string; content?: string; isCorrect: boolean }[];
	tags: string[];
};
