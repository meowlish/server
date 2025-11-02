import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '@core/exam/domain/repositories/section.repository';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TestCommand } from '../exam.test.command';

@CommandHandler(TestCommand)
export class TestHandler implements ICommandHandler<TestCommand> {
	constructor(
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(): Promise<void> {
		await this.sectionRepository.findOneInTheSameExamAsQuestion('1234', '4321');
	}
}
