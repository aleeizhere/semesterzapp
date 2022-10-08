import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  //creating a post
  @Post('/create')
  async createPost(
    @Body('username') creator: string,
    @Body('fullname') fullname: string,
    @Body('subject') subject: string,
    @Body('description') description: string,
  ) {
    return await this.postService.createPost(
      creator,
      fullname,
      subject,
      description,
      'available',
    );
  }

   

  @Get('/getposts/:creator')
  async getPosts(@Param('creator') creator: string) {
    const result = await this.postService.getPosts(creator);
    return result;
  }

  @Get('/postdetails/:postId')
  async getProposals(@Param('postId') postId: string) {
    return await this.postService.getProposals(postId);
  }

  @Get('/getallposts')
  async getAllPosts() {
    return await this.postService.gettingAllPost();
  }
  @Post('/deletepost')
  async deletePost(@Body('postId') postId: string) {
    const response = await this.postService.deletePost(postId);
    return { response: response.status, data: response.data };
  }
  @Get('/getidleposts')
  async getIdlePosts() {
    const response = await this.postService.getIdlePosts();
    return response;
  }
  @Get('/getengagedposts/:username')
  async getEngagedPosts(@Param('username') username: string) {
    const engagedPosts = await this.postService.getEngagedPosts(username);
    return engagedPosts;
  }
  @Post('/acceptpost/:postId')
  async acceptPost(@Param('postId') postId: string) {
    await this.postService.acceptPost(postId);
  }
  @Post('/rejectpost/:postId')
  async rejectPost(@Param('postId') postId: string) {
    await this.postService.rejectPost(postId);
  }
  @Post('/deleteallposts/:username')
  async deleteAllPosts(@Param('username') username: string) {
    await this.postService.deleteAllPosts(username);
  }
}
