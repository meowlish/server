import { Command } from '@server/utils';

export class CreateSectionCommandPayload {
	public readonly sectionId?: string;
	public readonly examId?: string;
	public readonly index: number;

	constructor(constructorOptions: { examId?: string; sectionId?: string; index?: number }) {
		this.examId = constructorOptions.examId;
		this.sectionId = constructorOptions.sectionId;
		this.index = constructorOptions.index ?? -1;
	}
}

export type CreateSectionCommandResult = {
	id: string;
};

export class CreateSectionCommand extends Command<
	CreateSectionCommandPayload,
	CreateSectionCommandResult
> {}
