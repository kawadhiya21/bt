var bunyan = require('bunyan');
var cfg = require('./cfg');

var log = bunyan.createLogger({name: cfg.appname, level: 'trace'});

module.exports = log;
