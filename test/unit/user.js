var assert = require('assert');
var User = require('../../user');

describe('User', function() {
    var hash;
    var u = new User();

    describe('#setPass()', function(){
        it('should set an bcrypt hashed password on user', function() {
            return u.setPass('test')
                .then(function (genhash) {
                    assert.ok(genhash);
                    assert.notEqual(u.pass, 'test');
                    assert.equal(u.pass, genhash);
                    hash = genhash;
                });
        });
    });

    describe('#checkPass()', function(){
        it('should identify a correct password attempt', function() {
            return u.checkPass('test')
                .then(assert.ok);
        });

        it('should identify an incorrect password attempt', function() {
            return u.checkPass('wrongpassword')
                .then(function (res) {
                    assert.ok(!res);
                });
        });
    });
});
