var Runner   = require('srunner').Runner
  , path     = require('path')
  , runner   = new Runner()
  , optimist = require('optimist')
  , params   = optimist
       .usage('Adds a tag with the latest package version\nUsage: $0')
       .alias('p', 'push').describe('p', 'optionally push tags to origin').boolean('p')
       .alias('m', 'message').describe('m', 'an optional tag message (defaults to "Version <num>")')
       .alias('d', 'delete').describe('d', 'deletes the current version tag (if any)').boolean('d')
       .alias('h', 'help').describe('h', 'displays usage')
  , argv = params.argv;

if (argv.help) {
    console.log(params.help());
    process.exit(0);
}

runner.init({ dir: path.join(__dirname, 'steps') });

if (argv.d) {
    runner.gitDeleteVersionTag();
} else {
    runner.gitAddVersionTag(argv);
}

if (argv.push) {
    runner.gitPushTags();
}

runner.run();

