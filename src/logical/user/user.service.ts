import { Injectable } from '@nestjs/common';
import Sequelize from 'sequelize';
import { encryptPassword, makeSalt } from 'src/utils/crypto';
import sequelize from '../../database/sequelize';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    const sql = `SELECT user_id userId, account_name username, real_name realName, passwd password,
    passwd_salt salt, mobile, role FROM admin_user WHERE account_name = '${username}' `;
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: true,
        })
      )[0];
      return user;
    } catch (e) {
      console.error(e);
      return void 0;
    }
  }

  async register(requestBody): Promise<unknown> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password != repassword) {
      return {
        code: '401',
        msg: 'password and repassword are different',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: 'already exists.',
      };
    }

    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    const registerSQL = `
    INSERT INTO admin_user 
    (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
    VALUES
    ('${accountName}', '${realName}', '${hashPassword}', '${salt}', '${mobile}', 1, 3, 0)`;

    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Succeed',
      };
    } catch (e) {
      return {
        code: 503,
        msg: 'Sevice error:' + e,
      };
    }
  }
}
