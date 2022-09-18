import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel } from './auth.model';
@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<AuthModel>,
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
    if (userobj.password === password) {
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

  async signup(
    fullname: string,
    email: string,
    username: string,
    password: string,
    role: string,
  ) {
    const newUser = new this.authModel({
      fullname,
      email,
      username,
      password,
      role,
    });
    const dbObj = await this.authModel.findOne(
      { username: username, email: email },
      { username: 1, email: 1, role: 1 },
    );
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
}
