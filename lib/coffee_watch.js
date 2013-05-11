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
       .alias('r', 'restart').describe('r', 'restarts an existing watcher in the current directory').boolean('r')
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
   .ensureDirExists({ dir: watchersDir, quiet: true })
   .genWatcherParams({ watchersDir: watchersDir, watchDir: process.cwd(), root: root });

if (argv.list) {
    runner
       .readWatchers()
       .listWatchers();
} else if (argv.stop) {
    runner
       .checkWatcher({ failOn: 'stopped' })
       .stopWatcher();
} else if (argv.restart) {
    runner
       .stopWatcher()
       .buildWatcher({ root: root })
       .startWatcher();
} else if (argv['stop-all']) {
    runner
       .readWatchers()
       .stopWatchers();
} else if (argv['tail-logs']) {
    runner
       .readWatchers()
       .tailWatchersLogs();
} else {
    runner
       .checkWatcher({ failOn: 'running' })
       .buildWatcher({ root: root })
       .startWatcher();
}

runner.run();
