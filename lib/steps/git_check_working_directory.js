var exec  = require('child_process').exec;

module.exports = function (cb) {
    exec('git status --porcelain', function (err, stdout, stderr) {
        var lines = stdout.toString('utf8').trim()
               .split('\n')
               .filter(function (line) { return line.trim() && !line.match(/^\?\? /); })
               .map(function (line) { return line.trim(); });

        if (lines.length) {
            cb(new Error('Git working directory not clean.\n' + lines.join('\n')));
        } else {
            cb();
        }
    });
};

