import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class GetSectionManagementDetailsDto implements exam.GetSectionManagementDetailsDto {
	@IsString()
	sectionId!: string;
}
