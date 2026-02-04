import { SectionType } from '../../enums/section-type.enum';
import { Question } from './question.entity';
import { ConflictException } from '@nestjs/common';
import { IEntity } from '@server/utils';
import { ORDER_RANGE_MEDIUM } from '@server/utils';
import { Action } from '@server/utils';

// reference to the children of a section, infer based on section.contentType
// if section.contentType is SectionType.SECTION, the children are sections
// else they are questions
export class SectionChildrenRef {
	constructor(
		public readonly id: string,
		public order: number,
		public action: Action = Action.READ,
	) {}
}

export class Section implements IEntity<Section> {
	static newId() {
		return crypto.randomUUID();
	}

	static orderRange: number = ORDER_RANGE_MEDIUM;
	public examId: string;
	public children: SectionChildrenRef[];
	public readonly id: string;
	public parentId: string | null;
	public contentType: SectionType;
	public directive: string;
	public name: string | null;

	constructor(constructorOptions: {
		examId: string;
		children: SectionChildrenRef[];
		id?: string;
		parentId: string | null;
		contentType: SectionType;
		name?: string | null;
		directive?: string;
	}) {
		this.id = constructorOptions.id ?? Section.newId();
		this.examId = constructorOptions.examId;
		this.contentType = constructorOptions.contentType;
		this.children = constructorOptions.children.toSorted((a, b) => a.order - b.order);
		this.parentId = constructorOptions.parentId ?? null;
		this.name = constructorOptions.name ?? null;
		this.directive = constructorOptions.directive ?? '';
	}

	public updateDetails(options: {
		directive?: string;
		name?: string | null;
		contentType?: SectionType;
	}): void {
		if (options.directive) this.directive = options.directive;
		if (options.name) this.name = options.name;
		if (options.contentType) {
			if (this.children.length > 0)
				throw new ConflictException(
					'Remove the children of this section before changing its type.',
				);
			this.contentType = options.contentType;
		}
	}

	// These methods are SUPER WRAPPERS...
	public createQuestion(idx = -1): void {
		if (this.contentType === SectionType.SECTION)
			throw new ConflictException('Cannot add questions to section reserved for sections only.');
		const questionId = Question.newId();
		this.addQuestion(questionId, idx);
		if (idx < 0 || idx > this.children.length) idx = this.children.length;
		this.children[idx].action = Action.CREATE;
	}

	public createSection(idx = -1): void {
		if (this.contentType === SectionType.QUESTION)
			throw new ConflictException('Cannot add sections to section reserved for questions only.');
		const sectionId = Section.newId();
		this.addSection(sectionId, idx);
		if (idx < 0 || idx > this.children.length) idx = this.children.length;
		this.children[idx].action = Action.CREATE;
	}

	// These methods are just wrappers to make the code more readable I hope
	public addQuestion(id: string, idx = -1): void {
		if (this.contentType === SectionType.SECTION)
			throw new ConflictException('Cannot add questions to section reserved for sections only.');
		this.addChild(id, idx);
	}

	public addSection(id: string, idx = -1): void {
		if (this.contentType === SectionType.QUESTION)
			throw new ConflictException('Cannot add sections to section reserved for questions only.');
		this.addChild(id, idx);
	}

	/**
	 * Index below 0 is automatically added to tail (default behavior)
	 * @param id the id of the new section
	 * @param idx the new index (0-based) of the new section
	 */
	private addChild(id: string, idx = -1): void {
		if (this.children.find(c => c.id === id)) throw new ConflictException('Child already exists.');
		const length = this.children.length;
		if (idx < 0 || idx > length) idx = length;
		let newOrder: number;
		// add tail
		if (idx === length) {
			const lastSection = this.children.at(-1);
			newOrder = lastSection ? lastSection.order + Section.orderRange : 0;
		}
		// add head
		else if (idx === 0) {
			const firstSection = this.children.at(0);
			newOrder = firstSection ? firstSection.order - Section.orderRange : 0;
		} else {
			const prev = this.children[idx - 1];
			const next = this.children[idx];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		this.children.splice(idx, 0, new SectionChildrenRef(id, newOrder, Action.UPDATE));
	}

	/**
	 * Move an existing child from one index to another
	 * @param id child id to move
	 * @param toIdx target index (0-based), < 0 means move to tail
	 */
	public moveChild(id: string, toIdx = -1): void {
		const fromIdx = this.children.findIndex(c => c.id === id);
		if (fromIdx === -1) {
			throw new Error(`Child ${id} not found`);
		}
		const length = this.children.length;
		if (toIdx < 0 || toIdx > length) toIdx = length;
		let newOrder: number;
		// move to tail
		if (toIdx === length) {
			const last = this.children.at(-1);
			newOrder = last ? last.order + Section.orderRange : 0;
		}
		// move to head
		else if (toIdx === 0) {
			const first = this.children.at(0);
			newOrder = first ? first.order - Section.orderRange : 0;
		}
		// move in middle
		else {
			const prev = this.children[toIdx - 1];
			const next = this.children[toIdx];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		const child = this.children[fromIdx];
		child.order = newOrder;
		child.action = Action.UPDATE;
		// add to new index
		this.children.splice(toIdx, 0, child);
		// remove from list
		this.children.splice(fromIdx, 1);
	}

	public rebalance(): void {
		let x = 0;
		for (const child of this.children) {
			child.order = x++ * Section.orderRange;
			child.action = Action.UPDATE;
		}
	}

	public equals(entity: Section): boolean {
		return this.id === entity.id;
	}
}
