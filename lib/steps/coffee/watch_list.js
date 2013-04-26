var fs    = require('fs')
  , async = require('async')
  , glob  = require('glob')
  , path  = require('path');

require('colors');

module.exports = function (state, options, cb) {
    var files = state.scripts
      , map   = {};

    files
       .filter(function (f) { return !f.match(/\.log/); })
       .forEach(function (f) {
            var key = f;
            if (f.match(/\.pid/)) {
                key = f.replace('.pid', '');
                map[key] = map[key] || {};
                map[key].running = true;
            } else {
                map[key] = map[key] || {};
            }
        });

    async.each(Object.keys(map), function (k, next) {
        fs.readFile(k, 'utf8', function (err, data) {
            if (err) { return next(err); }
            map[k].cwd = data.match(/app_cwd="([^"]+)"/)[1]
            next();
        });
    }, function (err) {
        if (err) { return cb(err); }

        Object.keys(map).forEach(function (k) {
            var o     = map[k]
              , rtext = 'running'.green
              , stext = 'stopped'.grey
              , pre   = o.running ? rtext : stext;
            console.log(pre + ' ' + o.cwd.blue);
        });

        cb();
    })
};

