var path     = require('path')
  , util     = require('./util')
  , runner   = require('srunner').create()
  , optimist = require('optimist')
  , params   = optimist
       .usage(util.usage('Add a tag with the latest package version'))
       .alias('p', 'push').describe('p', 'optionally push tags to origin').boolean('p')
       .alias('m', 'message').describe('m', 'an optional tag message (defaults to "Version <num>")')
       .alias('d', 'delete').describe('d', 'deletes the current version tag (if any)').boolean('d')
       .alias('h', 'help').describe('h', 'displays usage')
  , argv = params.argv;

if (argv.help) {
    console.log(params.help());
    process.exit(0);
}

runner.init({ dir: path.join(__dirname, 'steps', 'git') });

if (argv.d) {
    runner.gitDeleteVersionTag();
} else {
    runner.gitAddVersionTag(argv);
}

if (argv.push) {
    runner.gitPushTags();
}

runner.run();

