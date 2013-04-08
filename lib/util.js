var path = require('path');

require('colors');

module.exports.readVersion = function () {
    var file = path.join(process.cwd(), 'package.json')
      , data = require(file);
    return data.version;
}

module.exports.usage = function (desc) {
    var file = path.basename(process.argv[1]);
    return desc.blue.bold + ('\nUsage: ' + file + ' [options]').blue;
}
