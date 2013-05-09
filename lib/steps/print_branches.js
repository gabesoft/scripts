require('colors');

module.exports = function (state, options, cb) {
    var text = state.branches
           .map(function (b) {
                var pre   = b.current ? '* '.blue : '  '
                  , color = b.current ? 'blue' : 'yellow';
                return pre + b.branch[color];
            })
           .join('\n');
    state.log.info(text);
    cb();
};
