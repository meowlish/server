import { ExamStatus } from '../../enums/exam-status.enum';
import { SectionType } from '../../enums/section-type.enum';
import {
	ChildSectionCreatedEvent,
	ChildSectionMovedEvent,
	QuestionCreatedEvent,
	QuestionDeletedEvent,
	QuestionMovedEvent,
	SectionDeletedEvent,
	SectionUpdatedEvent,
} from '../events/exam-management.event';
import { ExamId } from './exam.entity';
import { Question } from './question.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate, IEntity } from '@server/utils';
import { ORDER_RANGE_MEDIUM } from '@server/utils';

// reference to the children of a section, infer based on section.contentType
// if section.contentType is SectionType.SECTION, the children are sections
// else they are questions
export class SectionChild implements IEntity<SectionChild> {
	constructor(
		public readonly id: string,
		public order: number,
	) {}
}

export class Section extends AggregateRoot<Event<any>> implements IAggregate<Section> {
	static newId() {
		return crypto.randomUUID();
	}

	static orderRange: number = ORDER_RANGE_MEDIUM;
	public readonly examId: ExamId;
	public readonly examStatus: ExamStatus;
	public children: SectionChild[];
	public readonly id: string;
	public parentId: string | null;
	public contentType: SectionType;
	public directive: string;
	public name: string | null;

	constructor(constructorOptions: {
		examId: ExamId;
		examStatus: ExamStatus;
		children: SectionChild[];
		id: string;
		parentId?: string | null;
		contentType: SectionType;
		name?: string | null;
		directive: string;
	}) {
		super();
		this.id = constructorOptions.id;
		this.examId = constructorOptions.examId;
		this.examStatus = constructorOptions.examStatus;
		this.contentType = constructorOptions.contentType;
		this.children = constructorOptions.children.toSorted((a, b) => a.order - b.order);
		this.parentId = constructorOptions.parentId ?? null;
		this.name = constructorOptions.name ?? null;
		this.directive = constructorOptions.directive;
	}

	private assertModifiable(): void {
		if (this.examStatus === ExamStatus.Approved)
			throw new ConflictException('Exam is already approved and can no longer be updated.');
	}

	public updateDetails(options: SectionUpdatableProperties): void {
		this.assertModifiable();
		if (options.directive) this.directive = options.directive;
		if (options.name || options.name === null) this.name = options.name;
		if (options.contentType) {
			if (this.children.length > 0)
				throw new ConflictException(
					'Remove the children of this section before changing its type.',
				);
			this.contentType = options.contentType;
		}
		this.apply(
			new SectionUpdatedEvent({
				examId: this.examId,
				sectionId: this.id,
				details: structuredClone(this),
			}),
		);
	}

	// These methods are SUPER WRAPPERS...
	public createQuestion(idx = -1): void {
		this.assertModifiable();
		if (this.contentType === SectionType.Section)
			throw new ConflictException(
				'Cannot add questions to section reserved for non-questions only.',
			);
		const questionId = Question.newId();
		const question = this.insertChild(questionId, idx);
		this.apply(new QuestionCreatedEvent({ sectionId: this.id, data: structuredClone(question) }));
	}

	public createSection(idx = -1): void {
		this.assertModifiable();
		if (this.contentType === SectionType.Question)
			throw new ConflictException('Cannot add sections to section reserved for non-sections only.');
		const sectionId = Section.newId();
		const section = this.insertChild(sectionId, idx);
		this.apply(
			new ChildSectionCreatedEvent({
				examId: this.examId,
				parentId: this.id,
				data: structuredClone(section),
			}),
		);
	}

	// These methods are just wrappers to make the code more readable I hope
	public addQuestion(id: string, idx = -1): void {
		this.assertModifiable();
		if (this.contentType !== SectionType.Question)
			throw new ConflictException(
				'Cannot add questions to section reserved for non-questions only.',
			);
		const question = this.insertChild(id, idx);
		this.apply(
			new QuestionMovedEvent({
				sectionId: this.id,
				questionId: question.id,
				data: structuredClone(question),
			}),
		);
	}

	public addSection(id: string, idx = -1): void {
		this.assertModifiable();
		if (this.contentType !== SectionType.Section)
			throw new ConflictException('Cannot add sections to section reserved for non-sections only.');
		const section = this.insertChild(id, idx);
		this.apply(
			new ChildSectionMovedEvent({
				examId: this.examId,
				parentId: this.id,
				sectionId: section.id,
				data: structuredClone(section),
			}),
		);
	}

	public removeQuestion(id: string): void {
		this.assertModifiable();
		if (this.contentType !== SectionType.Question)
			throw new ConflictException('The section only has non-questions');
		const idx = this.children.findIndex(c => c.id === id);
		if (idx === -1) throw new NotFoundException('Question not found');
		this.children.splice(idx, 1);
		this.apply(new QuestionDeletedEvent({ questionId: id }));
	}

	public removeSection(id: string): void {
		this.assertModifiable();
		if (this.contentType !== SectionType.Section)
			throw new ConflictException('The section only has non-sections');
		const idx = this.children.findIndex(c => c.id === id);
		if (idx === -1) throw new NotFoundException('Section not found');
		this.children.splice(idx, 1);
		this.apply(new SectionDeletedEvent({ sectionId: id }));
	}

	/**
	 * Index below 0 is automatically added to tail (default behavior)
	 * @param id the id of the new section
	 * @param idx the new index (0-based) of the new section
	 */
	private insertChild(id: string, idx = -1): SectionChild {
		if (this.children.find(c => c.id === id)) throw new ConflictException('Child already exists.');
		const length = this.children.length;
		if (idx < 0 || idx >= length) idx = length - 1;
		let newOrder: number;
		// add tail
		if (idx === length - 1) {
			const lastSection = this.children.at(-1);
			newOrder = lastSection ? lastSection.order + Section.orderRange : 0;
		}
		// add head
		else if (idx === 0) {
			const firstSection = this.children.at(0);
			newOrder = firstSection ? firstSection.order - Section.orderRange : 0;
		} else {
			const prev = this.children[idx];
			const next = this.children[idx + 1];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		const child = new SectionChild(id, newOrder);
		this.children.splice(idx, 0);
		return child;
	}

	/**
	 * Move an existing child from one index to another
	 * @param id child id to move
	 * @param toIdx target index (0-based), < 0 means move to tail
	 */
	public moveChild(id: string, toIdx = -1): void {
		this.assertModifiable();
		const fromIdx = this.children.findIndex(c => c.id === id);
		if (fromIdx === -1) throw new NotFoundException('Child not found');
		const length = this.children.length;
		if (toIdx < 0 || toIdx >= length) toIdx = length - 1;
		if (fromIdx === toIdx) return;
		let newOrder: number;
		// move to tail
		if (toIdx === length - 1) {
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
			const prev = this.children[toIdx];
			const next = this.children[toIdx + 1];
			if (next.order - prev.order <= 1) this.rebalance();
			newOrder = Math.floor((prev.order + next.order) / 2);
		}
		const child = this.children[fromIdx];
		child.order = newOrder;
		// add to new index
		this.children.splice(toIdx, 0, child);
		// remove from list
		this.children.splice(fromIdx, 1);
		this.apply(
			this.contentType === SectionType.Question ?
				new QuestionMovedEvent({
					sectionId: this.id,
					questionId: child.id,
					data: structuredClone(child),
				})
			:	new ChildSectionMovedEvent({
					examId: this.examId,
					parentId: this.id,
					sectionId: child.id,
					data: structuredClone(child),
				}),
		);
	}

	private rebalance(): void {
		let x = 0;
		for (const child of this.children) {
			child.order = x++ * Section.orderRange;
			this.apply(
				this.contentType === SectionType.Question ?
					new QuestionMovedEvent({
						sectionId: this.id,
						questionId: child.id,
						data: structuredClone(child),
					})
				:	new ChildSectionMovedEvent({
						examId: this.examId,
						parentId: this.id,
						sectionId: child.id,
						data: structuredClone(child),
					}),
			);
		}
	}
}

export type SectionUpdatableProperties = Partial<
	Pick<Section, 'name' | 'directive' | 'contentType'>
>;

export type SectionChildUpdatableProperties = Partial<Omit<SectionChild, 'id'>>;
