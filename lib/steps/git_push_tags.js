var exec  = require('child_process').exec;

module.exports = function (options, cb) {
    exec('git psuh --tags origin HEAD:master', cb);
};

