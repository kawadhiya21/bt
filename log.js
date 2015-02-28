var bunyan = require('bunyan');
var cfg = require('./cfg');

var log = bunyan.createLogger({name: cfg.appname});
module.exports = log;
