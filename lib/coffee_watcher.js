#!/usr/bin/env node

var Watcher    = require('watchfs').Watcher
  , path       = require('path')
  , exec       = require('child_process').exec
  , colors     = require('colors')
  , dateFormat = require('dateformat')
  , format     = 'mm/dd/yy hh:MM:ss'
  , dir        = process.cwd()
  , watcher    = new Watcher({
        dir: dir
      , filters: {
            includeDir: function (name) {
                var skip = /(\.git)|(node_modules)/.test(name);
                return !skip;
            }
          , includeFile: function (name) {
                return path.extname(name) === '.coffee';
            }
        }
    });

watcher.on('any', function (type, name) {
    var now = new Date();
    console.log(dateFormat(now, format).yellow + ' ' + name.blue);
    exec('make build', function (err, stdout, stderr) {
        if (err) {
            console.log('coffee build failed', err);
            console.log(stdout);
            console.log(stderr);
        }
    });
});

watcher.start(function (err) {
    var now = new Date();
    console.log(dateFormat(now, format).yellow + ' coffee watch started in ' + dir.blue);
});


