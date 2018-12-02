const s = require('shelljs');

s.rm('-rf', 'build');
s.mkdir('build');
if (!s.test('-f', '.env')) {
  s.cp('.env', 'build/.env');
}
s.cp('-R', 'public', 'build/public');
