import { ExamStatus } from '@core/exam/enums/exam-status.enum';

import { IEntity } from '@common/abstract/entity/entity.interface';

import { SectionRef } from './section-ref.model';

export class ExamReadModel {}

export class Exam implements IEntity<Exam> {
	static newId() {
		return crypto.randomUUID();
	}

	public title: string;
	public duration: number; // in seconds
	public status: ExamStatus;
	public createdBy: string;
	public readonly id: string;
	public description: string | null;
	public readonly sections: SectionRef[];

	constructor(constructorOptions: {
		id?: string;
		title: string;
		duration: number;
		createdBy: string;
		status: ExamStatus;
		description: string | null;
		sections: SectionRef[];
	}) {
		this.id = constructorOptions.id ?? Exam.newId();
		this.title = constructorOptions.title;
		this.duration = constructorOptions.duration;
		this.createdBy = constructorOptions.createdBy;
		this.status = constructorOptions.status;
		this.description = constructorOptions.description ?? null;
		this.sections = constructorOptions.sections.toSorted((a, b) => a.order - b.order);
	}

	public equals(entity: Exam): boolean {
		return this.id === entity.id;
	}
}
