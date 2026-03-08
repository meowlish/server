export enum QuestionType {
	FillInTheBlank = 'Fill', // Table completion, short answers, diagram completion, flowchart completion
	MultipleChoiceSingle = 'MCQ', // MCQ, choose a title, marching sentence ending, TFNG, YNNG, matching heading, matching info, summary completion?, sentence completion?
	MultipleChoiceMultiple = 'MCQ_MULTI', // List selection
	// Subjective types (manual grading)
	Writing = 'Writing',
}

export const questionTypesWithOnlyOneAnswer = [
	QuestionType.FillInTheBlank,
	QuestionType.MultipleChoiceSingle,
	QuestionType.Writing,
];
