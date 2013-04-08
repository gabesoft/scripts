var exec  = require('child_process').exec;

module.exports = function (options, cb) {
    exec('git commit -m"' + options.message + '"', cb);
};
