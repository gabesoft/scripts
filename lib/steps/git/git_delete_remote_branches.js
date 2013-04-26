var exec  = require('child_process').exec
  , async = require('async');

module.exports = function (state, options, cb) {
    var del = options.force ? '-D' : '-d';

    async.forEachSeries(state.branches, function (b, next) {
        exec('git push origin :' + b.branch, next);
    }, cb);
};

