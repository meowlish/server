import { Command } from '@server/utils';

export class RemoveCredCommand extends Command<{
	identityId: string;
	id: string;
}> {}
