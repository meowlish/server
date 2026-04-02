export enum QuestionType {
	FillExactInTheBlank = 'Fill', // Table completion, diagram completion, flowchart completion
	FillAnyInTheBlank = 'FillAny', // Short answers
	MultipleChoiceSingle = 'MCQ', // MCQ, choose a title, marching sentence ending, TFNG, YNNG, matching heading, matching info, summary completion?, sentence completion?
	MultipleChoiceMultiple = 'MCQ_MULTI', // List selection
	// Subjective types (manual grading)
	Writing = 'Writing',
}

// for validating user input
// these question types force user to choose only 1 single answer
export const questionTypesThatAllowOnlySingleAnswer = [
	QuestionType.FillExactInTheBlank,
	QuestionType.FillAnyInTheBlank,
	QuestionType.MultipleChoiceSingle,
	QuestionType.Writing,
];

// for scoring
// these question types allow user to only match at least one of the multiple correct answers
export const questionTypesThatAllowNonStrictMatch = [QuestionType.FillAnyInTheBlank];

// for generating exam
// these question types allow to have multiple correct choices
export const questionTypesWithMultipleCorrectChoices = [
	QuestionType.FillAnyInTheBlank,
	QuestionType.MultipleChoiceMultiple,
];
