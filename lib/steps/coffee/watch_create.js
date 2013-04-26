var fs       = require('fs')
  , async    = require('async')
  , path     = require('path')
  , template = path.join(__dirname, '..', 'init_template.sh');

module.exports = function (state, options, cb) {
    var params = state.params || options.params
      , runner = params.runner;

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
    ], cb);
};
