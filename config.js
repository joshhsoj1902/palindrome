var config = {};

config.mongoURI = {
  development: process.env.MONGO_URL||'mongodb://localhost/palindrome-dev',
  test: process.env.MONGO_URL||'mongodb://localhost/palindrome-test',
  production: process.env.MONGO_URL||'mongodb://localhost/palindrome'
};

module.exports = config;