import { AttemptScoredPublisher } from './attempt-scored.publisher';
import { AttemptSubmittedPublisher } from './attempt-submitted.publisher';
import { FileAddedPublisher } from './file-added.publisher';
import { FilesRemovedPublisher, FilesRemovedScheduler } from './files-removed.publisher';
import { WritingSubmittedPublisher } from './writing-submitted';

export const IntegrationEventPublishers = [
	AttemptScoredPublisher,
	AttemptSubmittedPublisher,
	FileAddedPublisher,
	FilesRemovedScheduler,
	FilesRemovedPublisher,
	WritingSubmittedPublisher,
];
