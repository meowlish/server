import { SectionType } from '../../../enums/section-type.enum';
import { Command } from '@server/utils';

export class UpdateSectionCommandPayload {
	public readonly id: string;
	public readonly name?: string | null;
	public readonly directive?: string;
	public readonly contentType?: SectionType;
	public readonly addTags?: string[];
	public readonly removeTags?: string[];
	public readonly addFiles?: string[];
	public readonly removeFiles?: string[];

	constructor(constructorOptions: {
		id: string;
		setNameNull?: boolean;
		name?: string;
		directive?: string;
		contentType?: SectionType;
		addTags?: string[];
		removeTags?: string[];
		addFiles?: string[];
		removeFiles?: string[];
	}) {
		this.id = constructorOptions.id;
		this.name = constructorOptions.name;
		if (constructorOptions.setNameNull) this.name = null;
		this.directive = constructorOptions.directive;
		this.contentType = constructorOptions.contentType;
		this.addTags = constructorOptions.addTags;
		this.removeTags = constructorOptions.removeTags;
		this.addFiles = constructorOptions.addFiles;
		this.removeFiles = constructorOptions.removeFiles;
	}
}

export class UpdateSectionCommand extends Command<UpdateSectionCommandPayload> {}
