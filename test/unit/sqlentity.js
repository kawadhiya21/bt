var assert = require('assert');
var Orm  = require('../../sqlentity');

describe('SqlEntity', function() {
    var entity = new Orm();

    entity._fieldtypes = {
        'name': 'str',
        'age': 'int',
        'created': 'time',
        'valid': 'bool',
        'invalid': 'bool'
    };

    describe('#tosql()', function(){
        it('should cast values into sql equivalents as defined by rules', function () {
            var now = new Date();
            entity.name = 123;
            entity.age = '23';
            entity.created = now;
            entity.valid = {};
            entity.invalid = null;

            assert.strictEqual(entity._tosql('name'), '123');
            assert.strictEqual(entity._tosql('age'), 23);
            assert.strictEqual(entity._tosql('created'), now.getTime());
            assert.strictEqual(entity._tosql('valid'), 1);
            assert.strictEqual(entity._tosql('invalid'), 0);
        });
    });

    describe('#fromsql()', function(){
        it('should cast values into js equivalents as defined by rules', function () {
            var now = new Date();
            entity._fromsql('name', 123);
            entity._fromsql('age', '23');
            entity._fromsql('created', now.getTime());
            entity._fromsql('valid', 1);
            entity._fromsql('invalid', 0);

            assert.strictEqual(entity.name, '123');
            assert.strictEqual(entity.age, 23);
            assert.strictEqual(entity.created.getTime(), now.getTime());
            assert.strictEqual(entity.valid, true);
            assert.strictEqual(entity.invalid, false);
        });
    });
});
