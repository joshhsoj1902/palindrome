var config = {};

//TODO: Change this to always use the environment var if it is defined
config.mongoURI = {
  development: process.env.MONGO_URL||'mongodb://localhost/palindrome-dev',
  test: process.env.MONGO_URL||'mongodb://localhost/palindrome-test',
  production: process.env.MONGO_URL||'mongodb://localhost/palindrome'
};

module.exports = config;