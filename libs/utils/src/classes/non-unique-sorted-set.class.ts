import { Comp, Eq } from '@rimbu/common';
import { HashSet, Hasher } from '@rimbu/hashed';
import { SortedSet } from '@rimbu/sorted';
import { FastIterator } from '@rimbu/stream';

// To be used when you need to maintain a set where the sort criteria is different from the uniqueness criteria
// Maintains 2 sets, imported from `rimbu` package for convinience
export class NonUniqueSortedSet<T> {
	private _hashSet: HashSet<T>;
	private _sortedSet: SortedSet<T>;

	constructor(config?: {
		hasher?: Hasher<T>;
		eq?: Eq<T>;
		comp?: Comp<T>;
		blockSizeBits?: number;
		from?: T[];
	}) {
		this._hashSet =
			!config || (!config.hasher && !config.eq && !config.blockSizeBits) ?
				HashSet.defaultContext().from(config?.from ?? [])
			:	HashSet.createContext(config).from(config.from ?? []);
		this._sortedSet =
			!config || (!config.comp && !config.blockSizeBits) ?
				SortedSet.defaultContext().from(this._hashSet)
			: !config.comp ? SortedSet.createContext(config).from(this._hashSet)
			: SortedSet.createContext({
					...config,
					comp: {
						...config.comp,
						compare(value1, value2) {
							return (
								config.comp?.compare(value1, value2) ||
								(config.hasher ?
									config.hasher.hash(value1) - config.hasher.hash(value2)
								:	Hasher.anyDeepHasher().hash(value1) - Hasher.anyDeepHasher().hash(value2))
							);
						},
					},
				}).from(this._hashSet);
	}

	add(value: T): void {
		if (this._hashSet.has(value)) return;
		this._hashSet = this._hashSet.add(value);
		this._sortedSet = this._sortedSet.add(value);
	}

	addAll(values: T[]): void {
		const oldHashSet = this._hashSet;
		this._hashSet = this._hashSet.addAll(values);
		this._sortedSet.addAll(this._hashSet.difference(oldHashSet));
	}

	remove(value: T): void {
		if (!this._hashSet.has(value)) return;
		this._hashSet = this._hashSet.remove(value);
		this._sortedSet = this._sortedSet.remove(value);
	}

	has(value: T): boolean {
		return this._hashSet.has(value);
	}

	findIndex(value: T): number {
		return this._sortedSet.findIndex(value);
	}

	forEach(f: (value: T, index: number, halt: () => void) => void): void {
		this._sortedSet.forEach(f);
	}

	min(): T | undefined {
		return this._sortedSet.min();
	}

	max(): T | undefined {
		return this._sortedSet.max();
	}

	getAtIndex(index: number): T | undefined {
		return this._sortedSet.getAtIndex(index);
	}

	get size(): number {
		return this._sortedSet.size;
	}

	get isEmpty(): boolean {
		return this._sortedSet.isEmpty;
	}

	[Symbol.iterator](): FastIterator<T> {
		return this._sortedSet[Symbol.iterator]();
	}

	filter(
		pred: (value: T, index: number, halt: () => void) => boolean,
		options?: { negate?: boolean },
	): NonUniqueSortedSet<T> {
		const result = new NonUniqueSortedSet<T>();
		result._sortedSet = this._sortedSet.filter(pred, options);
		result._hashSet = this._hashSet.context.from(result._sortedSet);
		return result;
	}

	toArray(): T[] {
		return this._sortedSet.toArray();
	}

	asSortedSet(): SortedSet<T> {
		return this._sortedSet;
	}
}
