import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PostsSchema } from './posts.model';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Post', schema: PostsSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
