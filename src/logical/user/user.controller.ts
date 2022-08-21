import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { RegisterInfoDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('find-one')
  async findOne(@Body() body: any) {
    return await this.usersService.findOne(body.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.usersService.register(body);
  }

  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT验证STEP1：用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: 'account or password incorrect',
        };
      default:
        return {
          code: 600,
          msg: 'not found',
        };
    }
  }
}
