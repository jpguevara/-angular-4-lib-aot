var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
const root = path.resolve('./');

console.log('Preparing dist folder...');
console.log('Using root: ', root);

const options = {
  aotPath: path.join(root, '/.aot'),
  distPath: path.join(root, '/dist')
};

const packageJson = JSON.parse(fs.readFileSync(path.join(root, '/package.json'), 'utf8'));

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson['angular-cli'];

if (!fs.existsSync(options.aotPath)) {
  console.log('WARNING: .aot/ does not exists.');
  return;
}

var deleting = false;
if (fs.existsSync(options.distPath)) {
  console.log('WARNING: dist/ directory already exists, I will delete it.');
  deleting = true;
  rimraf(options.distPath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    renameAndSave();
  });

}

function renameAndSave() {
  fs.renameSync(options.aotPath, options.distPath);
  fs.mkdirSync
  fs.writeFileSync(path.join(options.distPath, '/package.json'), JSON.stringify(packageJson, null, 4));
  console.log('Done.');
}

if (!deleting) {
  renameAndSave();
}