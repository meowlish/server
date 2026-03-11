import { TagService } from '../../app/services/tag.service';
import { AddTagDto } from '../dtos/req/tag/add-tag.req.dto';
import { DeleteTagDto } from '../dtos/req/tag/delete-tag.req.dto';
import { MoveTagDto } from '../dtos/req/tag/move-tag.req.dto';
import { UpdateTagDto } from '../dtos/req/tag/update-tag.dto';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { exam } from '@server/generated';

@exam.TagServiceControllerMethods()
@Controller()
export class TagController implements exam.TagServiceController {
	constructor(private readonly tagService: TagService) {}

	async addTag(@Payload() request: AddTagDto): Promise<void> {
		return this.tagService.addTag(request.name, request.parentId);
	}

	async deleteTag(@Payload() request: DeleteTagDto): Promise<void> {
		return this.tagService.deleteTag(request.id);
	}

	async moveTag(@Payload() request: MoveTagDto): Promise<void> {
		return this.tagService.moveTag(request.id, request.parentId);
	}

	async updateTag(@Payload() request: UpdateTagDto): Promise<void> {
		return this.tagService.updateTag(request.id, request.name);
	}
}
