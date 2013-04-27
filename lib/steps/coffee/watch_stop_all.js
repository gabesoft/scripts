var fs    = require('fs')
  , async = require('async')
  , exec  = require('child_process').exec;

require('colors');

module.exports = function (state, options, cb) {
    var map = state.watchers;

    async.each(Object.keys(map), function (k, next) {
        var file = map[k].watcher
          , cwd  = map[k].cwd
          , cmd  = file + ' stop';

        if (!map[k].running) {
            console.log('watcher ' + cwd.blue + ' not running'.grey);
            return next();
        }

        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                console.log('watcher ' + cwd.blue + ' failed to stop'.red);
                console.log(stdout, stderr, err);
            } else {
                console.log('watcher ' + cwd.blue + ' stopped'.green);
            }
        });
    }, cb);
};


