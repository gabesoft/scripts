var exec = require('child_process').exec
  , util = require('../../util');

module.exports = function (options, cb) {
    var ver = util.readVersion();
    exec('git tag -d v' + ver, cb);
}


