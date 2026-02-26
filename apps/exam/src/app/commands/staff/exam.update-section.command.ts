import { SectionType } from '../../../enums/section-type.enum';
import { Command } from '@server/utils';

export class UpdateSectionCommandPayload {
	public readonly id: string;
	public readonly name?: string | null;
	public readonly directive?: string;
	public readonly contentType?: SectionType;

	constructor(constructorOptions: {
		id: string;
		setNameNull?: boolean;
		name?: string;
		directive?: string;
		contentType?: SectionType;
	}) {
		this.id = constructorOptions.id;
		this.name = constructorOptions.name;
		if (constructorOptions.setNameNull) this.name = null;
		this.directive = constructorOptions.directive;
		this.contentType = constructorOptions.contentType;
	}
}

export class UpdateSectionCommand extends Command<UpdateSectionCommandPayload> {}
