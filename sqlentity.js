var toSqlFns = {
    'int': toNum,
    'str': toStr,
    'time': toTime,
    'bool': toBool
};

var fromSqlFns = {
    'int': fromNum,
    'str': fromStr,
    'time': fromTime,
    'bool': fromBool
};

function SqlEntity() {
    this._fieldtypes = {};
}

SqlEntity.prototype._tosql = function (field) {
    var type = this._fieldtypes[field];

    if (! type) {
        throw new Error('No type defined for field: ' + field);
    }

    if (! toSqlFns[type]) {
        throw new Error('No converter available for field type: ' + type);
    }

    return toSqlFns[type](this[field]);
};

SqlEntity.prototype._fromsql = function (field, val) {
    var type = this._fieldtypes[field];

    if (! type) {
        throw new Error('No type defined for field: ' + field);
    }

    if (! fromSqlFns[type]) {
        throw new Error('No converter available for field type: ' + type);
    }

    this[field] = fromSqlFns[type](val);
};

function toNum(val) {
    return Number(val);
}

function toStr(val) {
    return String(val);
}

function toTime(val) {
    return val.getTime();
}

function toBool(val) {
    return Number(Boolean(val));
}

function fromNum(val) {
    return Number(val);
}

function fromStr(val) {
    return String(val);
}

function fromTime(val) {
    return new Date(val);
}

function fromBool(val) {
    return Boolean(val);
}

module.exports = SqlEntity;
