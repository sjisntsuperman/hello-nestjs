// config/db.ts
const productConfig = {
  mysql: {
    port: 33066,
    host: 'mysql',
    user: 'root',
    password: '123456',
    database: 'hello_nestjs', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: 6379,
    host: 'redis',
    db: 0,
    password: '123456',
  },
};

const localConfig = {
  mysql: {
    port: 33066,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'hello_nestjs', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: '123456',
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config =
  process.env.NODE_ENV == 'production' ? productConfig : localConfig;

export default config;
