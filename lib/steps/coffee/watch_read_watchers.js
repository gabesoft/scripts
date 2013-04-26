var fs    = require('fs')
  , glob  = require('glob')
  , path  = require('path');

module.exports = function (state, options, cb) {
    var params  = state.params || options.params
      , pattern = path.join(params.watchers, 'coffee_*');

    glob(pattern, function (err, files) {
        state.watchScripts = files;
        state.scripts      = files;
        cb(err, files);
    });
};


