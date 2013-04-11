var path     = require('path')
  , util     = require('./util')
  , runner   = require('srunner').create()
  , optimist = require('optimist')
  , params   = optimist
       .usage(util.usage('Delete one or more branches matching a pattern'))
       .alias('p', 'pattern').describe('p', 'Wildcard pattern used to match the branches to delete').demand('p')
       .alias('r', 'remote').describe('r', 'Delete remote branches as well').boolean('r')
       .alias('t', 'test').describe('t', 'Test run just to see the selected branches').boolean('t')
       .alias('f', 'force').describe('f', 'Force delete unmerged branches').boolean('f')
       .alias('h', 'help').describe('h', 'Displays usage')
  , argv = params.argv;

if (argv.help) {
    console.log(params.help());
    process.exit(0);
}

runner
   .init({ dir: path.join(__dirname, 'steps'), quiet: false })
   .gitBranchList(argv)
   .printBranches();

if (!argv.test) {
    runner
       .checkCanDeleteBranches()
       .gitDeleteLocalBranches(argv);
}

if (!argv.test && argv.remote) {
    runner.gitDeleteRemoteBranches();
}

runner.run();


