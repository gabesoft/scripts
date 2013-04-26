var exec  = require('child_process').exec;

module.exports = function (state, options, cb) {
    var branch = options.branch || state.branch
      , repo   = options.repo || options.repository || state.repo || state.repository;

    exec('git pull ' + repo + ' ' + branch, function (err, stdout, stderr) {
        cb(err);
    });
};

