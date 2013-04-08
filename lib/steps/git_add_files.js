var exec  = require('child_process').exec
  , async = require('async');

module.exports = function (options, cb) {
    async.forEachSeries(options.files, function (file, next) {
        exec('git add ' + file, next);
    }, cb);
};
