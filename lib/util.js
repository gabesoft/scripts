var path = require('path');

module.exports.readVersion = function () {
    var file = path.join(process.cwd(), 'package.json')
      , data = require(file);
    return data.version;
}
