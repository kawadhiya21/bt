var express = require('express');
var exphbs = require('express-handlebars');
var cfg = require('./cfg');
var log = require('./log');
var router = require('./router');
var app = express();


// init templating
app.set('views', __dirname + '/public/views');
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/public/views/_layouts',
    partialsDir: __dirname + '/public/views/_partials'
}));
app.set('view engine', 'hbs');


// serve static files
app.use('/public', express.static('public'));


// log all incoming hits
app.use(function (req, res, next) {
    log.debug('%s: %s', req.method, req.url);
    next();
});


// load routes
app.use(router);


// handle 404
app.use(function (req, res) {
    log.warn('Resource not found: %s: %s', req.method, req.url);
    res.status(400);
    res.send('404!');
});


// handle errors
app.use(function (err, req, res, next) {
    if (! err) {
        return next();
    }

    log.error(err);
    res.status(500);
    res.send('500!');
});


app.listen(cfg.port);
log.info('listening on %s', cfg.port);
