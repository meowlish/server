import { HasRoles } from '../auth/decorators/roles.decorator';
import { EXAM_CLIENT } from './constants/exam';
import { AddTagDto } from './dtos/req/tag/add-tag.req.dto';
import { MoveTagDto } from './dtos/req/tag/move-tag.req.dto';
import { UpdateTagDto } from './dtos/req/tag/update-tag.dto';
import { AddedTagDto } from './dtos/res/tag/added-tag.res.dto';
import {
	Body,
	Controller,
	Delete,
	Inject,
	OnModuleInit,
	Param,
	Patch,
	Post,
	SerializeOptions,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { exam } from '@server/generated';
import { Role } from '@server/typing';

@HasRoles(Role.Mod, Role.Admin)
@Controller('tags')
export class TagGatewayController implements OnModuleInit {
	private tagService!: exam.TagServiceClient;

	constructor(@Inject(EXAM_CLIENT) private readonly examClient: ClientGrpc) {}

	onModuleInit() {
		this.tagService = this.examClient.getService<exam.TagServiceClient>(exam.TAG_SERVICE_NAME);
	}

	@Post()
	@SerializeOptions({ type: AddedTagDto })
	addTag(@Body() body: AddTagDto) {
		return this.tagService.addTag(body);
	}

	@Delete(':id')
	deleteTag(@Param('id') id: string) {
		return this.tagService.deleteTag({ id: id });
	}

	@Post(':id/move')
	moveTag(@Body() body: MoveTagDto, @Param('id') id: string) {
		return this.tagService.moveTag({ ...body, id: id });
	}

	@Patch(':id')
	updateTag(@Body() body: UpdateTagDto, @Param('id') id: string) {
		return this.tagService.updateTag({ ...body, id: id });
	}
}
