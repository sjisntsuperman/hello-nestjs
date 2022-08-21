import Redis from 'ioredis';
import { Logger } from '../utils/log4js';
import config from '../../configs/db';

let n = 0;
const redisIndex = [];
const redisList = [];

export class RedisInstance {
  static async initRedis(method: string, db = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      Logger.debug(
        `[Redis ${db}] 来自 ${method} 调用， Redis 实例化了 ${++n} 次`,
      );
      redisList[db] = new Redis({ ...config.redis, db });
      redisList.push(db);
    } else {
      Logger.debug(`[Redis ${db} 来自 ${method} 调用]`);
    }
    return redisList[db];
  }
}
