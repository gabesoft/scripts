var path     = require('path')
  , runner   = require('srunner').create()
  , util     = require('./util')
  , optimist = require('optimist')
  , watchers = path.join(__dirname, '..', '.watchers')
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
   .coffeeWatchParams({ watchers: watchers, dir: process.cwd() });

if (argv.list) {
    runner.coffeeWatchList();
} else if (argv.remove) {
    runner.coffeeWatchStop();
} else if (argv['remove-all']) {
    runner.coffeeWatchStopAll();
} else if (argv['tail-logs']) {
    runner.coffeeWatchTailLogs();
} else {
    runner
       .coffeeWatchCheck()
       .coffeeWatchCreate()
       .coffeeWatchStart();
}

runner.run();
