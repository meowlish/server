import { ConflictException } from '@nestjs/common';

import { IEntity } from '@common/abstract/entity/entity.interface';
import { ORDER_RANGE_MEDIUM } from '@common/constants/order-range.const';

import { QuestionRef } from './questio-ref.model';
import { SectionRef } from './section-ref.model';

export class Section implements IEntity<Section> {
	static newId() {
		return crypto.randomUUID();
	}

	static orderRange = ORDER_RANGE_MEDIUM;
	public examId: string;
	public readonly children: (QuestionRef | SectionRef)[];
	public readonly id: string;
	public parentId: string | null;
	public directive: string;
	public name: string | null;
	public order: number;

	constructor(constructorOptions: {
		examId: string;
		children: (QuestionRef | SectionRef)[];
		id?: string;
		parentId: string | null;
		order?: number;
		name?: string | null;
		directive?: string;
	}) {
		this.id = constructorOptions.id ?? Section.newId();
		this.examId = constructorOptions.examId;
		this.children = constructorOptions.children.toSorted((a, b) => a.order - b.order);
		this.parentId = constructorOptions.parentId ?? null;
		this.order = constructorOptions.order ?? 0;
		this.name = constructorOptions.name ?? null;
		this.directive = constructorOptions.directive ?? '';
	}

	public moveTo(section: Section): void {
		if (this.equals(section)) throw new ConflictException('Cannot section move to itself');
		this.order = section.getNewChildOrderValue();
	}

	public getNewChildOrderValue(): number {
		const lastChildOrder = this.children.at(-1)?.order;
		return lastChildOrder ? lastChildOrder + Section.orderRange : 0;
	}

	public equals(entity: Section): boolean {
		return this.id === entity.id;
	}
}
