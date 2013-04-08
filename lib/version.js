var Runner   = require('srunner').Runner
  , path     = require('path')
  , runner   = new Runner()
  , optimist = require('optimist')
  , argv     = optimist
       .usage('Increment package version\nUsage $0')
       .alias('t', 'type').describe('t', '[major | minor | patch | build]').demand('t')
       .alias('m', 'message').describe('m', 'message describing the version increase').demand('m')
       .alias('c', 'commit-message').describe('c', 'git commit message (defaults to "Version increase")')
       .argv;

runner
   .init({ dir: path.join(__dirname, 'steps') })
   .gitCheckWorkingDirectory()
   .incrementVersion(argv)
   .updateChangelog(argv)
   .gitAddFiles({ files: [ 'package.json', 'CHANGELOG.md' ] })
   .gitCommitChanges({ message: argv.c || 'Version increase' })
   .run();
