// config/database.js
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    timezone: '+07:00',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: false,
      freezeTableName: false,
      timestamps: false
    }
  }
);

module.exports = sequelize; 
