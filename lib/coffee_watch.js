var path        = require('path')
  , runner      = require('srunner').create()
  , util        = require('./util')
  , optimist    = require('optimist')
  , root        = path.join(__dirname, '..')
  , watchersDir = path.join(root, '.watchers')
  , params      = optimist
       .usage(util.usage([
            'Start watching for coffee files in the current directory and compile to javascript on change.\nThis assumes that running'.cyan,
            'make build'.yellow,
            'in the root directory will perform the coffee compile.'.cyan
        ]))
       .alias('s', 'stop').describe('s', 'stop an existing watcher in the current directory').boolean('s')
       .alias('l', 'list').describe('l', 'list all running watchers').boolean('l')
       .alias('a', 'stop-all').describe('a', 'stop all running watchers').boolean('a')
       .alias('t', 'tail-logs').describe('t', 'tail the logs of all running watchers').boolean('t')
       .alias('h', 'help').describe('h', 'displays usage')
  , argv = params.argv;

if (argv.help) {
    console.log(params.help());
    process.exit(0);
}

runner
   .init({ dir: path.join(__dirname, 'steps', 'coffee'), quiet: true })
   .ensureDirExists(watchersDir)
   .watchGenParams({ watchersDir: watchersDir, watchDir: process.cwd(), root: root });

if (argv.list) {
    runner
       .watchReadWatchers()
       .watchList();
} else if (argv.stop) {
    runner
       .watchCheckScript({ failOn: 'stopped' })
       .watchStopScript();
} else if (argv['stop-all']) {
    runner
       .watchReadWatchers()
       .watchStopAll();
} else if (argv['tail-logs']) {
    runner
       .watchReadWatchers()
       .watchTailLogs();
} else {
    runner
       .watchCheckScript({ failOn: 'running' })
       .watchCreateScript({ root: root })
       .watchStartScript();
}

runner.run();
