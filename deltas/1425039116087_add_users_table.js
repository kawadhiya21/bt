var mysql = require('../mysql');

module.exports = {
    up: function (cb) {
        mysql.getConnection(function (err, conn) {
            var sql = [
                'CREATE TABLE `users` (',
                '`id` int(11) unsigned NOT NULL AUTO_INCREMENT,',
                '`user` varchar(255) NOT NULL DEFAULT \'\',',
                '`pass` varchar(255) DEFAULT NULL,',
                'PRIMARY KEY (`id`),',
                'UNIQUE KEY `user` (`user`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8;',
            ].join('\n');

            conn.query(sql, cb);
        });
    },

    down: function (cb) {
        mysql.getConnection(function (err, conn) {
            var sql = 'DROP TABLE `users`;';
            conn.query(sql, cb);
        });
    }
};
