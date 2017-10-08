'use strict';
const fs = require('fs');
const path = require('path');
const root = './';

function header(text) {
  const row = Array(text.length + 5).join('=');
  let header = row + '\n';
  header += '= ' + text + ' =\n';
  header += row + '\n';
  console.log(header);
}


/**
 * Changes the content of the package.json with the object specified.
 * @returns {Object} Returns the old package.json
 */
function modifyPackageJson(newPackage) {

  const pkgPath = path.join(root, '/package.json');
  const packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  const newPackageJson = Object.assign({}, packageJson, newPackage);

  fs.writeFileSync(pkgPath, JSON.stringify(newPackageJson, null, 4));

  return packageJson;
}

function folderNameFromPackageName(packageName) {
  const folderName = packageName.replace(/@[A-Za-z0-9\-\.]*\//, '').replace('.', '-');
  return folderName;
}

function installDependencies() {
  console.log('Installing dependencies...');
  var spawn = require('child_process').execSync;
  var yarnInstall = spawn('yarn', ['install']);

  if (yarnInstall.stderr && yarnInstall.stderr.length > 0) {
    console.log(`stderr: ${yarnInstall.stderr.toString()}`);
  }
  if (yarnInstall.stdout && yarnInstall.stdout.length > 0) {
    console.log(`stdout: ${yarnInstall.stdout.toString()}`);
  }
}


function setup() {
  const readlineSync = require('readline-sync');
  const chalk = require('chalk');
  const validatePkgName = require('validate-npm-package-name');
  const tsTools = require('./typescript-tools');

  console.log(chalk.green('Dependencies installed.'));

  function removeGitRepo() {
    console.log(chalk.red('WARNING: Preparing to delete local git repository...'));
    let deleteGitRepo = readlineSync.keyInYNStrict('Delete the git repository?');

    if (deleteGitRepo) {
      console.log('Deleting .git folder...');
    } else {
      console.log('Not deleting...');
    }
  }

  function changeProjectName() {

    let result = { validForNewPackages: false };
    let projectName;
    do {

      projectName = readlineSync.question('Project name (default: new-library-project):');

      if (!projectName) {
        projectName = 'new-library-project';
        console.log('Using default name', projectName);
      }

      result = validatePkgName(projectName);

      if (result.errors) {
        result.errors.forEach(function (error) {
          console.log(chalk.red(error));
        }, this);
      }
      if (result.warnings) {
        result.warnings.forEach(function (warn) {
          console.log(chalk.red(warn));
        }, this);
      }

    } while (!result.validForNewPackages);

    console.log('Renaming package...');
    const oldePackage = modifyPackageJson({
      name: projectName
    });

    console.log('Renaming folders...');
    const basePath = `${root}src`;
    const oldDirectoryName = folderNameFromPackageName(oldePackage.name);
    const newDirectoryName = folderNameFromPackageName(projectName);

    console.log('Renaming component and module...');
    tsTools.renameAngularComponent(basePath, `${basePath}/${oldDirectoryName}`, oldDirectoryName, newDirectoryName);
    tsTools.renameAngularModule(basePath, `${basePath}/${oldDirectoryName}`, oldDirectoryName, newDirectoryName);

    // console.log('Renaming directory from ', oldDirectoryName, 'to', newDirectoryName);
    tsTools.renameDirectory(basePath, oldDirectoryName, newDirectoryName);
  }

  removeGitRepo();
  changeProjectName();
  console.log(chalk.green('Setup is complete.'));
}

header('Library Setup');
installDependencies();
setup();