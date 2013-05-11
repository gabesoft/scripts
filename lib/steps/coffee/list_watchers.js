var fs    = require('fs')
  , async = require('async');

require('colors');

module.exports = function (state, options, cb) {
    var map = state.watchers;

    Object.keys(map)
       .map(function (k) {
            var o     = map[k]
              , rtext = 'running'.green
              , stext = 'stopped'.grey
              return {
                  path   : o.cwd.blue
                , pid    : o.pid ? '(' + o.pid.grey + ')' : ''
                , status : o.running ? rtext : stext
              };
        })
       .sort(function (a, b) {
            return a.path.localeCompare(b.path);
        })
       .forEach(function (item) {
            console.log(item.status + ' ' + item.path + ' ' + item.pid);
        });

    cb();
};

