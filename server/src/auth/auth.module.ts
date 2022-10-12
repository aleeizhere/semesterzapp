import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema } from './auth.model';
import { PostsSchema } from 'src/posts/posts.model';
import { ProposalSchema } from 'src/proposals/proposals.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
      { name: 'Post', schema: PostsSchema },
      { name: 'Proposal', schema: ProposalSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
