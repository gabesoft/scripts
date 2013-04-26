var path     = require('path')
  , runner   = require('srunner').create()
  , util     = require('./util')
  , optimist = require('optimist')
  , argv     = optimist
       .usage(util.usage('Increment package version and create a git tag'))
       .alias('t', 'type').describe('t', '[major | minor | patch | build]').demand('t')
       .alias('m', 'message').describe('m', 'message describing the version increase').demand('m')
       .alias('p', 'push').describe('p', 'optionally push tags to origin').boolean('p')
       .alias('c', 'commit-message').describe('c', 'git commit message (defaults to "Version increase")')
       .argv;

runner
   .init({ dir: [
        path.join(__dirname, 'steps')
      , path.join(__dirname, 'steps', 'git')
    ], quiet: false })
   .gitCheckWorkingDirectory()
   .gitBranchCheckout({ branch: 'master' })
   .gitGetLatest({ repo: 'origin', branch: 'master' })
   .incrementVersion(argv)
   .updateChangelog(argv)
   .gitAddFiles({ files: [ 'package.json', 'CHANGELOG.md' ] })
   .gitCommitChanges({ message: argv.c || 'Version increase' })
   .gitAddVersionTag(argv);

if (argv.push) {
    runner.gitPushTags();
}

runner.run();
