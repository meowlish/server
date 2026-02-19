import { Event } from './event.class';

// from @nestjs/cqrs
export interface IAggregate<T extends IAggregate<T>, ID = string> {
	id: ID;
	apply(event: Event<any>, isFromHistory?: boolean): void;
	apply(
		event: Event<any>,
		options?: {
			fromHistory?: boolean;
			skipHandler?: boolean;
		},
	): void;
	commit(): void;
	uncommit(): void;
	getUncommittedEvents(): readonly Event<any>[];
	// [FOR EVENT SOURCING IF USED] look for aggregate's `on{eventName}` methods to execute. Or you can override.
	loadFromHistory(history: readonly Event<any>[]): void;
}
