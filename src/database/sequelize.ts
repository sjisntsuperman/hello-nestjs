import { Sequelize } from 'sequelize-typescript';
import db from '../../configs/db';

const sequelize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password || null,
  {
    host: db.mysql.host,
    dialect: 'mysql',
    pool: {
      max: db.mysql.connectionLimit,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+08:00',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('connect database succeed.');
  })
  .catch((e) => {
    console.error(e);
    throw e;
  });

export default sequelize;
