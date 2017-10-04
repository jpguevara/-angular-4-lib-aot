var packageJson = require('./package.json');
var fs = require('fs');
var rimraf = require('rimraf');

console.log('Preparing dist folder...');
delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson['angular-cli'];

if (!fs.existsSync('./.aot')) {
  console.log('WARNING: .aot does not exists.');
  return;
}

var deleting = false;
if (fs.existsSync('./dist')) {
  console.log('WARNING: ./dist/ directory already exists, I will delete it.');
  deleting = true;
  rimraf('./dist', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    renameAndSave();
  });

}

function renameAndSave() {
  fs.renameSync('./.aot', './dist');
  fs.mkdirSync
  fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 4));
  console.log('Done.');
}

if (!deleting) {
  renameAndSave();
}