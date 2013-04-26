var exec  = require('child_process').exec;

module.exports = function (state, options, cb) {
    var branch = options.branch || state.branch;
    exec('git checkout ' + branch, function (err, stdout, stderr) {
        cb(err);
    });
};
