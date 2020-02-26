require('dotenv').config();

module.exports = {
  mongoURI: process.env.mongoURIDev,
  secretOrKey: process.env.secretOrKey,
};
