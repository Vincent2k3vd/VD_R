const dotenv = require ('dotenv');
dotenv.config();

module.exports = {
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ,
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS),
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS)
};