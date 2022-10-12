import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { AuthModel } from './auth.model';
import * as bcrypt from 'bcrypt';
import { PostModel } from 'src/posts/posts.model';
import { ProposalModel } from 'src/proposals/proposals.model';
@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostModel>,
    @InjectModel('Auth') private readonly authModel: Model<AuthModel>,
    @InjectModel('Proposal')
    private readonly proposalModel: Model<ProposalModel>,
  ) {}

  async login(username: string, password: string) {
    const userobj = await this.authModel.findOne({ username: username });
    if (!userobj) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'username or password is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (userobj.role !== 'admin') {
      if (await bcrypt.compare(password, userobj.password)) {
        throw new HttpException(
          {
            user: {
              username: userobj.username,
              email: userobj.email,
              fullname: userobj.fullname,
              role: userobj.role,
            },
            status: HttpStatus.ACCEPTED,
            message: 'user found',
          },
          HttpStatus.ACCEPTED,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'username or password is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
    } else {
      if (password === userobj.password) {
        throw new HttpException(
          {
            user: {
              username: userobj.username,
              email: userobj.email,
              fullname: userobj.fullname,
              role: userobj.role,
            },
            status: HttpStatus.ACCEPTED,
            message: 'user found',
          },
          HttpStatus.ACCEPTED,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'username or password is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async signup(
    fullname: string,
    email: string,
    username: string,
    password: string,
    role: string,
  ) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new this.authModel({
      fullname,
      email,
      username,
      password: hashedPass,
      role,
    });
    const dbObj = await this.authModel.findOne({
      username: username,
      email: email,
    });

    if (dbObj) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'the username or email you entered already exists.',
        },
        HttpStatus.CONFLICT,
      );
    } else {
      const result = await newUser.save();
      throw new HttpException(
        {
          status: HttpStatus.ACCEPTED,
          message: 'User Added',
        },
        HttpStatus.ACCEPTED,
      );
    }
  }

  async gettingAllUsers() {
    try {
      const users = await this.authModel.find({}, { password: 0 });
      return users;
    } catch (e) {
      return e;
    }
  }

  async deleteUser(username: string) {
    try {
      const userRole = await this.authModel.findOne(
        { username: username },
        { role: 1 },
      );
      if (userRole.role === 'student') {
        await this.postModel.deleteMany({ creator: username });
        // await axios.post(
        //   `http://localhost:3333/posts/deleteallposts/${username}`,
        // );
      } else {
        await this.proposalModel.deleteMany({ creator: username });
        //   await axios.post(
        //   `http://localhost:3333/proposal/deleteallproposal/${username}`,
        // );
      }
      await this.authModel.findOneAndDelete({ username: username });
    } catch (e) {
      return e;
    }
  }
}
