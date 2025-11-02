import { TestCommand } from '@core/exam/app/commands/exam.test.command';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ExamServiceController, ExamServiceControllerMethods } from '@common/generated/exam';

@ExamServiceControllerMethods()
@Controller()
export class ExamController implements ExamServiceController {
	constructor(private commandBus: CommandBus) {}

	async test(): Promise<void> {
		console.log('123');
		return await this.commandBus.execute(new TestCommand({}));
	}
}
