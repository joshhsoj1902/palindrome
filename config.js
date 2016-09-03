var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/palindrome-dev',
  test: 'mongodb://localhost/palindrome-test',
  production: process.env.MONGO_URL
};

module.exports = config;