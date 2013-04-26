var exec = require('child_process').exec;

module.exports = function (state, options, cb) {
    var params = state.params
      , cmd    = params.runner + ' start';

    exec(cmd, function (err, stdout, stderr) {
        console.log(cmd);
        console.log(stdout.trim());
        if (err) {
            console.log(stderr.trim());
        }
        cb(err);
    });
};
