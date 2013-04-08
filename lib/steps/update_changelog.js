var exec  = require('child_process').exec
  , util  = require('../util')
  , fs    = require('fs')
  , path  = require('path')
  , async = require('async')
  , file  = path.join(process.cwd(), 'CHANGELOG.md');

function readChangelog (cb) {
    fs.readFile(file, function (err, data) {
        data = data ? data.toString('utf8') : '';
        cb(null, data.split('\n'));
    });
}

function writeChangelog (lines, cb) {
    var data = lines.join('\n');
    fs.writeFile(file, data, cb);
}

module.exports = function (options, cb) {
    var msg = options.message
      , ver = util.readVersion();

    readChangelog(function (err, lines) {
        if (err) { return cb(err); }

        lines.unshift('');
        lines.unshift(options.message);
        lines.unshift('-----');
        lines.unshift(ver);

        writeChangelog(lines, cb);
    });
};

