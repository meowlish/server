import { type AttemptConfig } from '../entities/attempt-config.entity';
import { type AttemptAnswer } from '../entities/attempt.entity';
import { Event } from '@server/utils';

// events
export class AttemptCreatedEvent extends Event<AttemptConfig> {}
export class AttemptSubmittedEvent extends Event<{ attemptId: string }> {}
export class AttemptScoredEvent extends Event<{
	attemptId: string;
	score: number;
	totalPoints: number;
}> {}
export class AttemptAnswerCreatedEvent extends Event<{
	attemptId: string;
	data: AttemptAnswer;
}> {}
export class AttemptAnswerUpdatedEvent extends Event<{
	attemptId: string;
	data: AttemptAnswer;
}> {}
