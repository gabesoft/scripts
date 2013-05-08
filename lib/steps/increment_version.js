var semver = require('semver')
  , path   = require('path')
  , fs     = require('fs')
  , types  = { 'major': true , 'minor': true , 'patch': true , 'build': true };

module.exports = function (state, options, cb) {
    if (!types[options.type]) {
        return cb(new Error('Invalid version type "' + options.type + '"'));
    }

    var type   = options.type
      , msg    = options.message
      , file   = path.join(process.cwd(), 'package.json')
      , data   = require(file)
      , newver = semver.inc(data.version, type);

    if (!newver) { return cb(new Error('Version not changed')); }

    data.version = newver;
    fs.writeFile(file, new Buffer(JSON.stringify(data, null, 2) + '\n'), function (err) {
        if (err) { return cb(err); }

        state.log.info('New version ' + data.version);
        cb();
    });
};
