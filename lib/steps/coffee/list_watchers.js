var fs    = require('fs')
  , async = require('async');

require('colors');

module.exports = function (state, options, cb) {
    var map = state.watchers;

    Object.keys(map).forEach(function (k) {
        var o     = map[k]
          , rtext = 'running'.green
          , stext = 'stopped'.grey
          , pre   = o.running ? rtext : stext;
        console.log(pre + ' ' + o.cwd.blue);
    });

    cb();
};

