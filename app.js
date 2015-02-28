var express = require('express');
var cfg = require('./cfg');
var log = require('./log');

var app = express();

// log all incoming hits
app.get(function (req, res, next) {
    log.debug('%s: %s', req.method, req.url);
    next();
});

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(cfg.port);
log.info('listening on %s', cfg.port);
