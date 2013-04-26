var exec = require('child_process').exec
  , util = require('../../util');

module.exports = function (options, cb) {
    var ver = util.readVersion()
      , msg = options.message || ('Version ' + ver);
    exec('git tag -a v' + ver + ' -m "' + msg + '"', cb);
}

