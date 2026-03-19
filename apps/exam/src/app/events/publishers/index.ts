import { AttemptScoredPublisher } from './attempt-scored.publisher';
import { AttemptSubmittedPublisher } from './attempt-submitted.publisher';

export const IntegrationEventPublishers = [AttemptScoredPublisher, AttemptSubmittedPublisher];
