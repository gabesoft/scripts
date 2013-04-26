var path = require('path')
  //, glob = require('glob');
  , exec = require('child_process').exec;

module.exports = function (state, options, cb) {
    if (!options.pattern) { return cb(new Error('No file pattern specified')); }
    //var files = glob.sync(path.join(dir, pattern)

    var dir     = options.dir || options.directory || process.cwd()
      , pattern = options.pattern
      , cmd     = 'find ' + dir + ' -name ' + pattern + ' -type f';

    exec(cmd, function (err, stdout, stderr) {
        if (err) { return cb(err); }

        var lines = stdout.toString('utf8')
               .split('\n')
               .filter(Boolean)
               .map(function(l) { return l.trim(); });

        state.files = lines;
        cb(null, lines);
    });
};

// TODO: use glob **
