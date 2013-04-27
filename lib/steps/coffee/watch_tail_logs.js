var spawn = require('child_process').spawn;

module.exports = function (state, options, cb) {
    var map  = state.watchers
      , logs = Object.keys(map).map(function (k) { return map[k].log; })
      , cmd  = 'tail'
      , args = ['-f'].concat(logs);

    proc = spawn(cmd, args);
    if (proc.stdout) {
        proc.stdout.on('data', function (data) {
            console.log(data.toString('utf8').trim());
        });
    }
    if (proc.stderr) {
        proc.stderr.on('data', function (data) {
            console.log(data.toString('utf8').trim());
        });
    }
};
