var fs    = require('fs')
  , glob  = require('glob')
  , path  = require('path');

module.exports = function (state, options, cb) {
    var params  = state.params || options.params
      , pattern = path.join(params.watchersDir, 'coffee_*');

    glob(pattern, function (err, files) {
        state.watchers = files;
        cb(err, files);
    });
};


