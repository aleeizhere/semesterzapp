import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    //call the login function from the service
    await this.authService.login(username, password);
  }
  @Post('/signup')
  async signup(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.signup(
      fullname,
      email,
      username,
      password,
    );
  }
}
