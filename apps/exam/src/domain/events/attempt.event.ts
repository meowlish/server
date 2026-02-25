import { type AttemptConfig } from '../entities/attempt-config.entity';
import {
	type AttemptAnswer,
	type AttemptAnswerUpdatableProperties,
} from '../entities/attempt.entity';
import { Event } from '@server/utils';

// events
export class AttemptCreatedEvent extends Event<AttemptConfig> {}
export class AttemptSubmittedEvent extends Event<{ attemptId: string }> {}
export class AttemptAnswerCreatedEvent extends Event<{
	attemptId: string;
	data: AttemptAnswer;
}> {}
export class AttemptAnswerUpdatedEvent extends Event<{
	attemptId: string;
	data: AttemptAnswerUpdatableProperties;
}> {}
