var crypto   = require('crypto')
  , path     = require('path');

module.exports = function (state, options, cb) {
    var watchersDir = options.watchersDir
      , dir         = options.watchDir
      , root        = options.root
      , hash        = crypto.createHash('sha1')
      , name        = 'coffee_' + hash.update(dir).digest('hex')
      , watcher     = path.join(watchersDir, name)
      , pid         = watcher + '.pid'
      , log         = watcher + '.log'
      , exe         = path.join(root, 'lib', 'coffee_watcher.js');

    state.params = {
        watcher            : watcher
      , watchersDir        : watchersDir
      , dir                : dir
      , cwd                : dir
      , cwd_full_path      : dir
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
