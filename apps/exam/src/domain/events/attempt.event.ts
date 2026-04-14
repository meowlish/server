import { type AttemptConfig } from '../entities/attempt-config.entity';
import { type AttemptResponse } from '../entities/attempt.entity';
import { Event } from '@server/utils';

// events
export class AttemptCreatedEvent extends Event<AttemptConfig> {}
export class AttemptSubmittedEvent extends Event<{ attemptId: string }> {}
export class AttemptScoredEvent extends Event<{
	attemptId: string;
	score: number;
	totalPoints: number;
}> {}
export class AttemptResponseCreatedEvent extends Event<{
	attemptId: string;
	data: AttemptResponse;
}> {}
export class AttemptResponseUpdatedEvent extends Event<{
	attemptId: string;
	data: AttemptResponse;
}> {}
