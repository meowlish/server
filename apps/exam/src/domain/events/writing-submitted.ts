import { Event } from '@server/utils';

export class WritingSubmittedEvent extends Event<{
	attemptId: string;
	responseId: string;
	questionId: string;
	responseContent: string;
}> {}
