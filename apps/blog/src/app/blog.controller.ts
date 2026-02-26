import { BlogService } from './blog.service';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { blog, common } from '@server/generated';

@blog.BlogServiceControllerMethods()
@Controller()
export class BlogController implements blog.BlogServiceController {
	constructor(private readonly blogService: BlogService) {}

	async createBlog(data: blog.CreateBlogRequest): Promise<blog.BlogResponse> {
		return this.blogService.createBlog(data);
	}

	async getBlog(data: blog.GetBlogRequest): Promise<blog.BlogResponse> {
		return this.blogService.getBlog(data.id);
	}

	async updateBlog(data: blog.UpdateBlogRequest): Promise<blog.BlogResponse> {
		return this.blogService.updateBlog(data);
	}

	async deleteBlog(data: blog.DeleteBlogRequest): Promise<common.Empty> {
		await this.blogService.deleteBlog(data.id);
		return {};
	}

	async listBlogs(data: blog.ListBlogsRequest): Promise<blog.ListBlogsResponse> {
		return this.blogService.listBlogs(data);
	}
}
