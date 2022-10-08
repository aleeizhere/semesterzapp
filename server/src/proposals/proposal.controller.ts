import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProposalService } from './proposals.service';

@Controller('proposal')
export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  @Post('/create')
  async createProposal(
    @Body('postId') postId: string,
    @Body('teacherUsername') teacherUsername: string,
    @Body('fullname') fullname: string,
    @Body('price') price: number,
    @Body('status') status: string,
  ) {
    return await this.proposalService.createProposal(
      postId,
      teacherUsername,
      fullname,
      price,
      status,
    );
  }

  @Get('getpostproposals/:postId')
  async getPostProposals(@Param('postId') postId: string) {
    return await this.proposalService.getPostProposals(postId);
  }

  @Post('/deletepostproposals/:postId')
  async deletePostProposals(@Param('postId') postId: string) {
    // console.log('proposal controller delete');
    return await this.proposalService.deletePostProposals(postId);
  }

  @Get('/getallproposals')
  async getAllProposals() {
    return await this.proposalService.getallproposals();
  }
  @Get('/submittedproposals/:username')
  async getsubmittedproposals(@Param('username') username: string) {
    // console.log('submittedProposals');
    return await this.proposalService.getSubmittedProposals(username);
  }
  @Post('/acceptproposal')
  async acceptProposal(@Body('proposalId') proposalId: string) {
    await this.proposalService.acceptProposal(proposalId);
  }
  @Post('/rejectproposal')
  async rejectProposal(@Body('proposalId') proposalId: string) {
    await this.proposalService.rejectProposal(proposalId);
  }
  @Post('/deleteallproposal/:username')
  async deleteallproposal(@Param('username') username: string) {
    await this.proposalService.deleteproposals(username);
  }
}
