import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/crypto';
import { UserService } from '../user/user.service';
import { RedisInstance } from '../../database/redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(username);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword == hashPassword) {
        return {
          code: 1,
          user,
        };
      }
      return {
        code: 2,
        user: null,
      };
    }
    return {
      code: 3,
      user: null,
    };
  }

  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      realName: user.realName,
      role: user.role,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      await redis.setex(`${user.id}-${user.username}`, 300, `${token}`);
      return {
        code: 200,
        data: {
          token,
        },
        msg: 'login succeed',
      };
    } catch (e) {
      return {
        code: 600,
        msg: 'account or password error',
        errMsg: e,
      };
    }
  }
}
