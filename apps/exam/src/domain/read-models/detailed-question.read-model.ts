// for reviewing an attempt response specific to a question (including info of the parenting section too (files, directives etc))
export type DetailedQuestionInfo = {
	id: string;
	sectionContext: { content: string; fileUrls: string[] }[];
	content: string;
	type: string;
	explanation: string;
	points: number;
};
