import { IRepository } from '@common/abstract/repository/repository.interface';

export interface ITransactionSession {
	getRepository<T>(entity: new () => T): IRepository<T>;
}

export interface ITransactionManager {
	/**
	 * Automatically run the callback in a transaction.
	 * Reuses current transaction if already present.
	 */
	runInTransaction<T>(callback: (session: ITransactionSession) => Promise<T>): Promise<T>;

	/**
	 * Start a manual transaction (optional).
	 */
	start(): Promise<ITransactionSession>;

	commit(session: ITransactionSession): Promise<void>;

	abort(session: ITransactionSession): Promise<void>;
}
