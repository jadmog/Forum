var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: 'myapp',
  stream: process.stdout,
  level: 'info'
});

log.info("This is logging");