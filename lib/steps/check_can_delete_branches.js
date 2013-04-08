module.exports = function (state, options, cb) {
    var br  = state.branches || []
      , on  = br.some(function (b) { return b.current; })
      , msg = 'You are on one of the selected branches'
      , err = on ? new Error(msg) : null;
    cb(err);
}
