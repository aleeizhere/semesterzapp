import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostModel } from './posts.model';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({})
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostModel>,
  ) {}

  async createPost(
    creator: string,
    fullname: string,
    subject: string,
    description: string,
  ) {
    const newPost = new this.postModel({
      creator,
      fullname,
      subject,
      description,
    });

    try {
      await newPost.save();
      return newPost;
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
  //getting all posts, for teacher
  async gettingAllPost() {}

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

  async deletePost(postId: string) {
    // await this.postModel.deleteOne({ _id: postId });
    try {
      return await axios.post(
        `http://localhost:3333/proposal/deletepostproposals/${postId}`,
      );
    } catch (e) {
      return e;
    }
  }

  //getting the proposals of the particular postId
  async getProposals(postId: string) {
    const proposalslist = await fetch(
      `http://localhost:3333/proposal/getpostproposals/${postId}`,
    );
    return proposalslist;
  }

  async getIdlePosts() {
    try {
      // getting all the pending posts, pending means that no proposal has been made on those posts
      const allPosts = await this.postModel.find();
      const allProposals = await axios.get(
        'http://localhost:3333/proposal/getallproposals',
      );

      if (!allProposals.data.length) {
        return { allPosts: allPosts };
      } else {
        const allIdlePosts = allProposals.data.map((e) => {
          return allPosts.filter((post) => post._id != e.postId);
        });
        return allIdlePosts[0];
      }
    } catch (e) {
      return e;
    }
  }

  async getEngagedPosts(username: string) {
    try {
      const allPosts = await this.postModel.find();
      const submittedProposals = await axios.get(
        `http://localhost:3333/proposal/submittedproposals/${username}`,
      );
      const engagedPosts = submittedProposals.data.map((proposal) => {
        return allPosts.find((post) => post._id.toString() === proposal.postId);
      });
      // console.log(typeof submittedProposals.data[0].postId);
      // console.log('All Posts', typeof allPosts[0]._id);
      return engagedPosts;
    } catch (e) {
      return e;
    }
  }
}
