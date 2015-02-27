// MySQL connection pool
var mysql = require('mysql');
var cfg = require('./cfg');

var pool = mysql.createPool({
    connectionLimit: cfg['mysql.pool.connlimit'],
    host: cfg['mysql.db.host'],
    user: cfg['mysql.db.user'],
    password: cfg['mysql.db.password'],
    database: cfg['mysql.db.name']
});

module.exports = pool;
