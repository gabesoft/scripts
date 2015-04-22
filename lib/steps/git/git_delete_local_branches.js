var exec  = require('child_process').exec
  , path  = require('path')
  , fs    = require('fs')
  , async = require('async');

module.exports = function (state, options, cb) {
    var del = options.force ? '-D' : '-d'
      , cwd = process.cwd();

    function runPostDeleteHook (branch, cb) {
        var file = path.join(cwd, '.git/hooks/post-branch-delete')
          , cmd  = 'GIT_DIR=' + cwd + ' ' + file + ' ' + branch;
        if (fs.existsSync(file)) {
            state.log.info('running post branch delete hook')
            state.log.info(cmd.yellow);
            exec(cmd, cb);
        } else {
            state.log.warn('post branch delete hook not found');
            cb();
        }
    }

    async.forEachSeries(state.branches, function (b, next) {
        exec('git branch ' + del + ' ' + b.branch, function () {
            runPostDeleteHook(b.branch, next);
        });
    }, cb);
};
