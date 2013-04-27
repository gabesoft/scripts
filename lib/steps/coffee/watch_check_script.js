var fs = require('fs');

module.exports = function (state, options, cb) {
    var params = state.params || options.params
      , failOn = options.failOn;

    fs.exists(params.pid, function (exists) {
        var err = null;
        if (exists && failOn === 'running') {
            err = new Error('Folder ' + params.dir + ' is already being watched');
        } else if (!exists && failOn === 'stopped') {
            err = new Error('Folder ' + params.dir + ' is not being watched');
        }
        cb(err);
    });
};

