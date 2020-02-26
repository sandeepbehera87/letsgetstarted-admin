require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI:
      'mongodb+srv://sandeep:fx731texA9kMfY52@letsgetstarted-wzxao.mongodb.net/letsgetstarted?retryWrites=true&w=majority',
    secretOrKey: 'behaareraushonbornsep19tem20ber17',
  };
} else {
  module.exports = {
    mongoURI:
      'mongodb://localhost:27017/letsgetstarted?retryWrites=true&w=majority',
    secretOrKey: 'behaareraushonbornsep19tem20ber17',
  };
}
