import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class TagNodeDto implements exam.TagList_TagNode {
	@Expose()
	name!: string;

	@Expose()
	parent?: string;
}

export class TagListDto implements exam.TagList {
	@Expose()
	@Type(() => TagNodeDto)
	list!: TagNodeDto[];
}
