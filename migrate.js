var cfg = require('./cfg');
var Migrashun = require('migrashun');
var mysql = require('./mysql');
var log = require('./log');
var param = null;
var command = 'up';

var m = new Migrashun(
    // SET PATH TO MIGRATIONS DIRECTORY
    cfg['mysql.migrations.dir'],

    // PROVIDE FUNTION TO GET LAST MIGRATION FILENAME
    function (cb) {
        // ensure migrations table exists
        setupMigrationsTable(function (err) {
            if (err) {
                return cb(err);
            }

            mysql.getConnection(function (err, conn) {
                if (err) {
                    return cb(err);
                }

                // select row from table
                var sql = 'SELECT `filename` FROM `' + cfg['mysql.migrations.table'] + '` LIMIT 1';

                conn.query(sql, function(err, rows) {
                    conn.release();

                    if (err) {
                        return cb(err);
                    }

                    // callback with last filename
                    cb(null, rows.length ? rows[0].filename : null);
                });
            });
        });
    },


    // PROVIDE FUNCTION TO UPDATE LAST MIGRATION FILENAME
    function (fname, cb) {
        mysql.getConnection(function (err, conn) {
            if (err) {
                return cb(err);
            }

            // empty the table
            var sql = 'DELETE FROM `' + cfg['mysql.migrations.table'] + '`';
            conn.query(sql, function(err) {
                if (err) {
                    conn.release();
                    return cb(err);
                }

                // insert filename
                sql = 'INSERT INTO `' + cfg['mysql.migrations.table'] + '`(`filename`) ' +
                    ' VALUES("' + fname + '")';
                conn.query(sql, function(err) {
                    conn.release();
                    if (err) {
                        return cb(err);
                    }

                    cb();
                });
            });
        });
    },


    // ITER
    function (fname, direction) {
        log.info('#', direction, ':', fname);
    }
);

// Parse direction (up/down) and count (if any)
var argv = process.argv.slice(2);

switch (argv.length) {
    case 2:
        command = argv[0];
        param = argv[1];
        break;
    case 1:
        command = argv[0];
        break;
}

switch (command) {
    case 'create':
        m[command](param, function (err, fname) {
            if (err) {
                exit(err, 1);
            }

            log.info('Created new migration:', fname);
            exit();
        });
        break;

    case 'up':
    case 'down':
        m[command](Number(param), function (err) {
            if (err) {
                exit(err, 1);
            }

            log.info('All migrations complete');
            exit();
        });
        break;

    default:
        log.error('Invalid command');
        exit(new Error('Invalid command'), 1);
}

function exit(err, code) {
    if (err) {
        log.fatal(err);
    }

    process.exit(code || 0);
}

// Creates migration table if does not exist
function setupMigrationsTable(cb) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            return cb(err);
        }

        // Check if table exists
        var sql = 'SELECT 1 FROM `' + cfg['mysql.migrations.table'] + '` LIMIT 1';
        conn.query(sql, function(err) {
            if (err) {
                // Table does not exist, create and send back null as the value
                sql = 'CREATE TABLE `' + cfg['mysql.migrations.table'] + '`(`filename` TEXT)';

                return conn.query(sql, function (err) {
                    conn.release();
                    if (err) {
                        return cb(err);
                    }

                    cb();
                });
            }

            conn.release();
            cb();
        });
    });
}
