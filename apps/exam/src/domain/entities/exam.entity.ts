import { ExamStatus } from '../../enums/exam-status.enum';
import { Section } from './section.entity';
import { ConflictException } from '@nestjs/common';
import { IEntity } from '@server/utils';
import { ORDER_RANGE_MEDIUM } from '@server/utils';
import { Action } from '@server/utils';

export class ExamReadModel {}

// reference type to sections of exam
export class ExamSectionRef {
	constructor(
		public readonly id: string,
		public order: number,
		public action: Action = Action.READ,
	) {}
}

export class Exam implements IEntity<Exam> {
	static newId() {
		return crypto.randomUUID();
	}

	static orderRange: number = ORDER_RANGE_MEDIUM;
	public title: string;
	public duration: number; // in seconds
	public status: ExamStatus;
	public createdBy: string;
	public readonly id: string;
	public description: string | null;
	public sections: ExamSectionRef[];

	constructor(constructorOptions: {
		id?: string;
		title: string;
		duration: number;
		createdBy: string;
		status: ExamStatus;
		description: string | null;
		sections: ExamSectionRef[];
	}) {
		this.id = constructorOptions.id ?? Exam.newId();
		this.title = constructorOptions.title;
		this.duration = constructorOptions.duration;
		this.createdBy = constructorOptions.createdBy;
		this.status = constructorOptions.status;
		this.description = constructorOptions.description ?? null;
		this.sections = constructorOptions.sections.toSorted((a, b) => a.order - b.order);
	}

	public updateDetails(options: {
		title?: string;
		duration?: number;
		description?: string | null;
	}): void {
		if (this.status === ExamStatus.APPROVED) {
			throw new ConflictException('Exam is already approved and can no longer be updated.');
		}
		if (options.title) this.title = options.title;
		if (options.duration) this.duration = options.duration;
		if (options.description || options.description === null) this.description = options.description;
	}

	public updateStatus(status: ExamStatus) {
		if (this.status === ExamStatus.APPROVED) {
			throw new ConflictException('Exam is already approved and can no longer be updated.');
		}
		this.status = status;
	}

	/**
	 * Index below 0 is automatically added to tail (default behavior)
	 * @param idx the new index (0-based) of the new section
	 */
	public createSection(idx = -1): void {
		const sectionId = Section.newId();
		this.addSection(sectionId, idx);
		const length = this.sections.length;
		if (idx < 0 || idx > length) idx = length;
		this.sections[idx].action = Action.CREATE;
	}

	/**
	 * Index below 0 is automatically added to tail (default behavior)
	 * @param id the id of the new section
	 * @param idx the new index (0-based) of the new section
	 */
	public addSection(id: string, idx = -1): void {
		if (this.sections.findIndex(s => s.id === id))
			throw new ConflictException('Section already exists.');
		const length = this.sections.length;
		if (idx < 0 || idx > length) idx = length;
		let newOrder: number;
		// add tail
		if (idx === length) {
			const lastSection = this.sections.at(-1);
			newOrder = lastSection ? lastSection.order + Exam.orderRange : 0;
		}
		// add head
		else if (idx === 0) {
			const firstSection = this.sections.at(0);
			newOrder = firstSection ? firstSection.order - Exam.orderRange : 0;
		}
		// add in middle
		else {
			const prev = this.sections[idx - 1];
			const next = this.sections[idx];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		this.sections.splice(idx, 0, new ExamSectionRef(id, newOrder, Action.UPDATE));
	}

	/**
	 * Index below 0 is automatically added to tail (default behavior)
	 * @param id the id of the new section
	 * @param toIdx the new index (0-based) of the new section
	 */
	public moveSection(id: string, toIdx = -1): void {
		const fromIdx = this.sections.findIndex(s => s.id === id);
		if (!fromIdx) {
			throw new Error(`Child ${id} not found`);
		}
		const length = this.sections.length;
		if (toIdx < 0 || toIdx > length) toIdx = length;
		let newOrder: number;
		// move tail
		if (toIdx === length) {
			const lastSection = this.sections.at(-1);
			newOrder = lastSection ? lastSection.order + Exam.orderRange : 0;
		}
		// move head
		else if (toIdx === 0) {
			const firstSection = this.sections.at(0);
			newOrder = firstSection ? firstSection.order - Exam.orderRange : 0;
		}
		// move middle
		else {
			const prev = this.sections[toIdx - 1];
			const next = this.sections[toIdx];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		const section = this.sections[fromIdx];
		section.order = newOrder;
		section.action = Action.UPDATE;
		// add to new index
		this.sections.splice(toIdx, 0, section);
		// remove from list
		this.sections.splice(fromIdx, 1);
	}

	public rebalance(): void {
		let x = 0;
		for (const section of this.sections) {
			section.order = x++ * Exam.orderRange;
			section.action = Action.UPDATE;
		}
	}

	public equals(entity: Exam): boolean {
		return this.id === entity.id;
	}
}
