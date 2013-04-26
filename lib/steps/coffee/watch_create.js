var fs    = require('fs')
  , async = require('async')
  , path  = require('path');

module.exports = function (state, options, cb) {
    var params   = state.params || options.params
      , template = path.join(options.root, 'lib', 'init_template.sh')
      , runner   = params.runner;

    async.waterfall([
        function (next) {
            fs.readFile(template, 'utf8', next);
        }
      , function (data, next) {
            Object.keys(params).forEach(function (p) {
                data = data.replace('{{' + p + '}}', params[p]);
            });
            next(null, data);
        }
      , function (data, next) {
            fs.writeFile(runner, data, next);
        }
      , function (next) {
            fs.chmod(runner, '777', next);
        }
    ], cb);
};
