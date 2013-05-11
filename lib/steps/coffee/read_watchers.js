var fs    = require('fs')
  , glob  = require('glob')
  , async = require('async')
  , path  = require('path');

module.exports = function (state, options, cb) {
    var params  = state.params || options.params
      , pattern = path.join(params.watchersDir, 'coffee_*');

    glob(pattern, function (err, files) {
        var map = {};

        files.forEach(function (f) {
            var key = f;

            if (f.match(/\.pid/)) {
                key = f.replace('.pid', '');

                map[key] = map[key] || {};
                map[key].running = true;
                map[key].hash = f;
            } else if (f.match(/\.log/)) {
                key = f.replace('.log', '');

                map[key] = map[key] || {};
                map[key].log = f;
            } else {
                map[key] = map[key] || {};
                map[key].watcher = f;
            }
        });

        async.each(Object.keys(map), function (k, next) {
            fs.readFile(k, 'utf8', function (err, data) {
                if (err) { return next(err); }
                map[k].cwd = data.match(/app_cwd="([^"]+)"/)[1]

                if (map[k].running) {
                    fs.readFile(k + '.pid', 'utf8', function (err, pid) {
                        if (err) { return next(err); }
                        map[k].pid = pid.trim();
                        next();
                    });
                } else {
                    next();
                }
            });
        }, function (err) {
            if (err) { return cb(err); }

            state.watchers = map;
            cb(null, map);
        })
    });
};


