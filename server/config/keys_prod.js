require('dotenv').config();

module.exports = {
  mongoURI: process.env.mongoURIProd,
  secretOrKey: process.env.secretOrKey,
};
