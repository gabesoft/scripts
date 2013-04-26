var path     = require('path')
  , runner   = require('srunner').create()
  , util     = require('./util')
  , optimist = require('optimist')
  , root     = path.join(__dirname, '..')
  , watchers = path.join(root, '.watchers')
  , params   = optimist
       .usage(util.usage([
            'Start watching for coffee files in the current directory and compile to javascript on change.\nThis assumes that running'.cyan,
            'make build'.yellow,
            'in the root directory will perform the coffee compile.'.cyan
        ]))
       .alias('r', 'remove').describe('r', 'remove an existing watcher in the current directory').boolean('r')
       .alias('l', 'list').describe('l', 'list all running watchers').boolean('l')
       .alias('a', 'remove-all').describe('a', 'remove all running watchers').boolean('a')
       .alias('t', 'tail-logs').describe('t', 'tail the logs of all running watchers').boolean('t')
       .alias('h', 'help').describe('h', 'displays usage')
  , argv = params.argv;

if (argv.help) {
    console.log(params.help());
    process.exit(0);
}

runner
   .init({ dir: path.join(__dirname, 'steps', 'coffee') })
   .ensureDirExists(watchers)
   .watchParams({ watchers: watchers, dir: process.cwd(), root: root });

if (argv.list) {
    runner.watchList();
} else if (argv.remove) {
    runner.watchStop();
} else if (argv['remove-all']) {
    runner.watchStopAll();
} else if (argv['tail-logs']) {
    runner.watchTailLogs();
} else {
    runner
       .watchCheck()
       .watchCreate({ root: root })
       .watchStart();
}

runner.run();
