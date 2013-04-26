var crypto   = require('crypto')
  , path     = require('path');

module.exports = function (state, options, cb) {
    var watchers = options.watchers
      , root     = options.root
      , hash     = crypto.createHash('sha1')
      , sha      = 'coffee_' + hash.update(options.dir).digest('hex')
      , runner   = path.join(watchers, sha)
      , pid      = runner + '.pid'
      , log      = runner + '.log'
      , exe      = path.join(root, 'lib', 'coffee_watcher.js');

    state.params = {
        runner             : runner
      , dir                : options.dir
      , cwd                : options.dir
      , cwd_full_path      : options.dir
      , exe                : exe
      , exe_full_path      : exe
      , app_args           : ''
      , pid                : pid
      , pid_file_full_path : pid
      , log                : log
      , log_file_full_path : log
    };

    cb(null, state.params);
};
