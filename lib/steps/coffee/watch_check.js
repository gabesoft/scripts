var fs = require('fs');

module.exports = function (state, options, cb) {
    var params = state.params || options.params;

    fs.exists(params.pid, function (exists) {
        var msg = 'Folder ' + params.dir + ' is already being watched';
        cb(exists ? new Error(msg) : null);
    });
};

