require("dotenv").config();

module.exports = {
  pass: process.env.PASS,
  user: process.env.USER,
  hostDB: process.env.HOST_DB,
  nameDB: process.env.NAME_DB,
  userDB: process.env.USER_DB,
  passDB: process.env.PASS_DB,
  PORT: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  JWT_CONFIRMED_TOKEN: process.env.JWT_CONFIRMED_TOKEN,
  service: process.env.service,
  REACT_APP_SECRET_KEY: process.env.REACT_APP_SECRET_KEY,
};
