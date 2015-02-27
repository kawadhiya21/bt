var bcrypt = require('bcrypt');
var cfg = require('./cfg');
var SqlEntity = require('./sqlentity');

function User() {
    SqlEntity.call(this);

    this._fieldtypes = {
        'id': 'int',
        'user': 'str',
        'pass': 'str'
    };
}

// Set new password for user
User.prototype.setPass = function (pass) {
    var usr = this;

    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(cfg['bcrypt.saltstrength'], function (err, salt) {
            if (err) {
                return reject(err);
            }

            bcrypt.hash(pass, salt, function (err, hash) {
                usr.pass = hash;
                resolve(hash);
            });
        });
    });
};

// Check password attempt
User.prototype.checkPass = function (pass) {
    var correctpass = this.pass;

    return new Promise(function (resolve, reject) {
        bcrypt.compare(pass, correctpass, function (err, res) {
            if (err) {
                return reject(err);
            }

            resolve(res);
        });
    });
};


module.exports = User;
