import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProposalModel } from './proposals.model';

@Injectable({})
export class ProposalService {
  constructor(
    @InjectModel('Proposal')
    private readonly proposalModel: Model<ProposalModel>,
  ) {}

  async createProposal(
    postId: string,
    teacherUsername: string,
    fullname: string,
    price: number,
    status: string,
  ) {
    const newProposal = new this.proposalModel({
      postId,
      teacherUsername,
      fullname,
      price,
      status,
    });
    try {
      await newProposal.save();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: "There's some problem in posting your job post",
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getPostProposals(postId: string) {
    try {
      const proposalsArray = await this.proposalModel.find({ postId: postId });
      return proposalsArray;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: "There's some problem in getting your job proposals",
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  async deletePostProposals(postId: string) {
    try {
      return await this.proposalModel.deleteMany({ postId: postId });
    } catch (e) {
      return e;
    }
  }

  async getallproposals() {
    try {
      const allProposals = await this.proposalModel.find();
      return allProposals;
    } catch (e) {
      return e;
    }
  }

  async getSubmittedProposals(username: string) {
    try {
      const submittedProposals = await this.proposalModel.find({
        teacherUsername: username,
        status: 'pending',
      });
      // console.log('service submittedProposals', submittedProposals);
      return submittedProposals;
    } catch (e) {
      return e;
    }
  }
  //when the student would click the accept proposal, the pending property of the proposal would update to completed
  //the deal property of the post model would update with the object of the proposalId that is accepted.
}
