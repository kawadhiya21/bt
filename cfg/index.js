var defaults = {
    'appname': 'bt',
    'bcrypt.saltstrength': 10,

    'mysql.db.host': 'localhost',
    'mysql.db.name': 'bt',
    'mysql.db.user': 'root',
    'mysql.db.password': 'password',

    // Simultaneous connection limit for mysql pool
    'mysql.pool.connlimit': 5,

    // Name of directory where migration scripts are stored
    'mysql.migrations.dir': __dirname + '/../deltas',

    // Table name in which last migration info will be saved
    'mysql.migrations.table': 'last_migration',

    // App will run on this port
    'port': 8080
};

module.exports = defaults;
