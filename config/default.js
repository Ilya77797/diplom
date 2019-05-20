const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {

  secret:   'mysecret',
  mongoose: {
    uri:  'mongodb://localhost:27017/diplom'   ,
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5

      }
    }
  },
  crypto: {
    hash: {
      length:     128,
      iterations: 12000
    }
  },
  root:     process.cwd(),
  port: 8080,

};


