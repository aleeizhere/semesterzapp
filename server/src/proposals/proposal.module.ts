import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalSchema } from './proposals.model';
import { ProposalService } from './proposals.service';
import { ProposalController } from './proposal.controller';
import { PostsSchema } from 'src/posts/posts.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Proposal', schema: ProposalSchema },
      { name: 'Post', schema: PostsSchema },
    ]),
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
