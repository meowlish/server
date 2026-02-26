import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BLOG_CLIENT } from './constants/blog';
import { blog } from '@server/generated';
import { type ClientGrpc } from '@nestjs/microservices';
import { CreateBlogDto } from './dtos/req/create-blog.req.dto';
import { UpdateBlogDto } from './dtos/req/update-blog.req.dto';
import { BlogResponseDto, ListBlogsResponseDto } from './dtos/res/blog.res.dto';

@ApiTags('Blog')
@Controller('blogs')
export class BlogGatewayController implements OnModuleInit {
	private blogService!: blog.BlogServiceClient;

	constructor(@Inject(BLOG_CLIENT) private readonly blogClient: ClientGrpc) {}

	onModuleInit() {
		this.blogService = this.blogClient.getService<blog.BlogServiceClient>(blog.BLOG_SERVICE_NAME);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new blog' })
	@ApiBody({ type: CreateBlogDto })
	@ApiCreatedResponse({ type: BlogResponseDto })
	async createBlog(@Body() data: CreateBlogDto) {
		return this.blogService.createBlog({
			title: data.title,
			content: data.content,
			authorId: data.authorId,
			tags: data.tags || []
		});
	}

	@Get()
	@ApiOperation({ summary: 'Get a list of blogs' })
	@ApiQuery({ name: 'author_id', required: false, type: String, description: 'Filter by author ID' })
	@ApiQuery({ name: 'tags', required: false, type: [String], description: 'Filter by tags (comma separated or multiple items)' })
	@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
	@ApiOkResponse({ type: ListBlogsResponseDto })
	async listBlogs(
		@Query('author_id') authorId?: string,
		@Query('tags') tags?: string | string[],
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		const parsedTags = Array.isArray(tags) ? tags : (tags ? [tags] : []);
		return this.blogService.listBlogs({
			authorId: authorId,
			tags: parsedTags,
			page: page ? Number(page) : 1,
			limit: limit ? Number(limit) : 10,
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	@ApiOkResponse({ type: BlogResponseDto })
	async getBlog(@Param('id') id: string) {
		return this.blogService.getBlog({ id });
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	@ApiBody({ type: UpdateBlogDto })
	@ApiOkResponse({ type: BlogResponseDto })
	async updateBlog(@Param('id') id: string, @Body() data: UpdateBlogDto) {
		return this.blogService.updateBlog({ id, title: data.title, content: data.content, tags: data.tags || [] });
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a blog by id' })
	@ApiParam({ name: 'id', type: String, description: 'Blog ID' })
	@ApiOkResponse({ description: 'Deleted file correctly' })
	async deleteBlog(@Param('id') id: string) {
		return this.blogService.deleteBlog({ id });
	}
}
