import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalSchema } from './proposals.model';
import { ProposalService } from './proposals.service';
import { ProposalController } from './proposal.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Proposal', schema: ProposalSchema }]),
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
