var exec  = require('child_process').exec;

module.exports = function (state, options, cb) {
    var branch = options.branch || state.branch;
    exec('git branch ' + branch, function (err, stdout, stderr) {
        if (err && /already exists/.test(err)) {
            if (!options.quiet) {
                console.log('A branch named "' + branch + '" already exists.');
            }
            cb();
        } else {
            cb(err);
        }
    });
};
