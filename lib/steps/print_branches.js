require('colors');

module.exports = function (state, options, cb) {
    state.branches.forEach(function (b) {
        var pre   = b.current ? '* '.blue : '  '
          , color = b.current ? 'blue' : 'yellow';
        console.log(pre + b.branch[color]);
    });
    cb();
};
