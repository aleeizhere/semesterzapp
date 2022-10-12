import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  //
  @Post('/signup')
  async signup(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    const result = await this.authService.signup(
      fullname,
      email,
      username,
      password,
      role,
    );
  }

  @Get('/getallusers')
  async getAllUser() {
    const users = await this.authService.gettingAllUsers();
    return users;
  }

  @Post('/deleteuser/:username')
  async deleteUser(@Param('username') username: string) {
    await this.authService.deleteUser(username);
  }
}
