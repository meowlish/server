import { SectionType } from '../../../enums/section-type.enum';
import { Command } from '@server/utils';

export class UpdateSectionCommandPayload {
	public readonly id: string;
	public readonly setNameNull?: boolean;
	public readonly name?: string;
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
		this.setNameNull = constructorOptions.setNameNull;
		this.name = constructorOptions.name;
		this.directive = constructorOptions.directive;
		this.contentType = constructorOptions.contentType;
	}
}

export class UpdateSectionCommand extends Command<UpdateSectionCommandPayload> {}
