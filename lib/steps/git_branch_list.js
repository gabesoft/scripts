var exec  = require('child_process').exec
  , async = require('async');

function parseBranches (stdout) {
    var patt = /\*/;

    return stdout
       .toString('utf8')
       .split('\n')
       .filter(Boolean)
       .map(function (line) {
            return {
                branch  : line.replace(patt, '').trim()
              , current : patt.test(line)
            };
        });
}

module.exports = function (state, options, cb) {
    var opts = '';

    if (options.remote) { opts = '-r'; }
    if (options.all) { opts = '-a'; }
    if (options.pattern) { opts = '--list ' + options.pattern; }

    exec('git branch ' + opts, function (err, stdout, stderr) {
        if (err) { return cb(err); }

        state.branches = parseBranches(stdout);
        cb(null, state.branches);
    });
};
