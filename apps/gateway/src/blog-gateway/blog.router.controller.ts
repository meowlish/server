import { BLOG_CLIENT } from './constants/blog';
import { CreateBlogDto } from './dtos/req/create-blog.req.dto';
import { UpdateBlogDto } from './dtos/req/update-blog.req.dto';
import { BlogResponseDto, ListBlogsResponseDto } from './dtos/res/blog.res.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	OnModuleInit,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { blog } from '@server/generated';
import { lastValueFrom } from 'rxjs';

@ApiTags('Blog')
@Controller('blogs')
export class BlogGatewayController implements OnModuleInit {
	private blogService!: blog.BlogServiceClient;

	constructor(@Inject(BLOG_CLIENT) private readonly blogClient: ClientGrpc) {}

	onModuleInit() {
		this.blogService = this.blogClient.getService<blog.BlogServiceClient>(blog.BLOG_SERVICE_NAME);
	}

	@Post()
	@ApiBody({ type: CreateBlogDto })
	@ApiCreatedResponse({ type: BlogResponseDto })
	@ApiOperation({ summary: 'Create a new blog' })
	async createBlog(@Body() data: CreateBlogDto) {
		return await lastValueFrom(
			this.blogService.createBlog({
				title: data.title,
				content: data.content,
				authorId: data.authorId,
				tags: data.tags || [],
			}),
		);
	}

	@Get()
	@ApiOkResponse({ type: ListBlogsResponseDto })
	@ApiOperation({ summary: 'Get a list of blogs' })
	@ApiQuery({
		name: 'author_id',
		required: false,
		type: String,
		description: 'Filter by author ID',
	})
	@ApiQuery({
		name: 'tags',
		required: false,
		type: [String],
		description: 'Filter by tags (comma separated or multiple items)',
	})
	@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
	async listBlogs(
		@Query('author_id') authorId?: string,
		@Query('tags') tags?: string | string[],
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		const parsedTags =
			Array.isArray(tags) ? tags
			: tags ? [tags]
			: [];
		return await lastValueFrom(
			this.blogService.listBlogs({
				authorId: authorId,
				tags: parsedTags,
				page: page ? Number(page) : 1,
				limit: limit ? Number(limit) : 10,
			}),
		);
	}

	@Get(':id')
	@ApiOkResponse({ type: BlogResponseDto })
	@ApiOperation({ summary: 'Get a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	async getBlog(@Param('id') id: string) {
		return await lastValueFrom(this.blogService.getBlog({ id }));
	}

	@Put(':id')
	@ApiBody({ type: UpdateBlogDto })
	@ApiOkResponse({ type: BlogResponseDto })
	@ApiOperation({ summary: 'Update a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	async updateBlog(@Param('id') id: string, @Body() data: UpdateBlogDto) {
		return await lastValueFrom(
			this.blogService.updateBlog({
				id,
				title: data.title,
				content: data.content,
				tags: data.tags || [],
			}),
		);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'Deleted file correctly' })
	@ApiOperation({ summary: 'Delete a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	async deleteBlog(@Param('id') id: string) {
		return await lastValueFrom(this.blogService.deleteBlog({ id }));
	}
}
