import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostModel } from './posts.model';
import { ProposalModel } from 'src/proposals/proposals.model';

@Injectable({})
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostModel>,
    @InjectModel('Proposal')
    private readonly proposalModel: Model<ProposalModel>,
  ) {}

  async createPost(
    creator: string,
    fullname: string,
    subject: string,
    description: string,
    status: string,
  ) {
    const newPost = new this.postModel({
      creator,
      fullname,
      subject,
      description,
      status,
    });

    try {
      await newPost.save();
      return newPost;
    } catch (e) {
      console.log(e.message);
    }
  }
  //getting all posts, for teacher
  async gettingAllPost() {
    try {
      const allPosts = await this.postModel.find();
      return allPosts;
    } catch (e) {
      return e;
    }
  }

  //get posts of the currently logged in user, for student
  async getPosts(creator: string) {
    try {
      const postsArray = await this.postModel.find({ creator: creator });
      return postsArray;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: "There's some problem in fetching your posts",
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  //when the post delete all the proposals on that post as well
  //pick up the post id and delete the proposals of that postId

  async deletePost(postId: string) {
    try {
      await this.postModel.deleteOne({ _id: postId });

      return await this.proposalModel.deleteMany({ postId: postId });
      // `http://localhost:3333/proposal/deletepostproposals/${postId}`,
    } catch (e) {
      return e;
    }
  }

  //getting the proposals of the particular postId
  async getProposals(postId: string) {
    // const proposalslist = await fetch(
    //   `http://localhost:3333/proposal/getpostproposals/${postId}`,
    // );
    const proposalslist = await this.proposalModel.find({ postId: postId });
    return proposalslist;
  }

  async getIdlePosts() {
    try {
      // getting all the pending posts, pending means that no proposal has been made on those posts
      const allPosts = await this.postModel.find({
        $or: [{ status: 'available' }, { status: 'rejected' }],
      });
      // const allProposals = await axios.get(
      //   'http://localhost:3333/proposal/getallproposals',
      // );
      return allPosts;
      // } else {
      //   const allIdlePosts = allProposals.data.map((proposal) => {
      //     const filteredArr = allPosts.filter(
      //       (post) => proposal.postId !== post._id.toString(),
      //     );
      //     console.log(filteredArr.length);
      //     return filteredArr;
      //   });
      //   return allIdlePosts.slice(-1);
    } catch (e) {
      return e;
    }
  }

  async getEngagedPosts(username: string) {
    try {
      let allPosts = await this.postModel.find();
      const submittedProposals = await this.proposalModel.find({
        teacherUsername: username,
      });
      // const submittedProposals = await axios.get(
      // `http://localhost:3333/proposal/submittedproposals/${username}`,
      // );
      const engagedPosts = submittedProposals.map((proposal) => {
        return allPosts.find((post) => post._id.toString() === proposal.postId);
      });
      // const rejectedPosts = submittedProposals.data.map((proposal) => {
      //   if (proposal.status === 'rejected') {
      //     const postId = proposal.postId;
      //     let x = allPosts.find((post) => post._id.toString() === postId);
      //     return x;
      //     // return allPosts.find((post) => post._id === postId);
      //   }
      // });
      // let finalEngagedPosts = engagedPosts.filter(
      //   (x) => !rejectedPosts.includes(x),
      // );
      // console.log('All Posts=>', allPosts);
      // console.log('Submitted Proposals=>', submittedProposals.data);
      // let engagedPosts = [];
      // submittedProposals.data.forEach((proposal) => {
      //   engagedPosts = allPosts.filter(
      //     (post) => proposal.postId === post._id.toString(),
      //   );
      //   allPosts = engagedPosts;
      //   console.log('EngagedPosts', engagedPosts);
      // });

      // console.log(typeof submittedProposals.data[0].postId);
      // console.log('All Posts', typeof allPosts[0]._id);
      // console.log('Final Engaged Posts', finalEngagedPosts);
      // console.log('Engaged Posts', engagedPosts);
      // console.log('Rejected Posts', rejectedPosts);

      return engagedPosts;
    } catch (e) {
      return e;
    }
  }

  async acceptPost(postId: string) {
    const post = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { status: 'accepted' },
    );
    // console.log('Post status changed', post);
  }
  async rejectPost(postId: string) {
    const post = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { status: 'rejected' },
    );
    // console.log('Post status changed', post);
  }

  async deleteAllPosts(username: string) {
    try {
      console.log('deleteing posts of', username);
      await this.postModel.deleteMany({ creator: username });
    } catch (e) {
      return e;
    }
  }
}
