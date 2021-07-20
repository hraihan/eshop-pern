//import dotenv from 'dotenv';
import Sequelize from 'sequelize';
//import pkg from 'pg';
//const { Pool, Client } = pkg;
//dotenv.config();

const connectDB = async () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);
  const dbType = sequelize.getDialect();
  const dbName = sequelize.getDatabaseName();
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        ` ${dbType} Database Connected | DB Name : ${dbName}`.cyan.underline
      );
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`.red.underline.bold);
      process.exit(1);
    });
};

// ==> Connection
//const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
//});

//pool.on('connect', () => {
//  console.log(' sucesso!');
//});

//module.exports = {
//  query: (text, params) => pool.query(text, params),
//};

/**
export const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});
*/
//export const client = new Client({
//  connectionString: process.env.DATABASE_URL,
//});

export default connectDB;
