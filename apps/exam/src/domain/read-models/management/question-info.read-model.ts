import { FilePreviewInfo } from './file-preview.read-model';

export type QuestionManagementInfo = {
	id: string;
	sectionId: string;
	content: string;
	type: string;
	points: number;
	explanation: string;
	choices: ChoiceManagementInfo[];
	files: FilePreviewInfo[];
	tags: string[];
};

export type ChoiceManagementInfo = {
	id: string;
	key: string;
	content?: string;
	isCorrect: boolean;
	questionId: string;
};
