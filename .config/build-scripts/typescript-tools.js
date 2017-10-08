const fs = require('fs');
const path = require('path');
const replaceInFile = require('replace-in-file');
const changeCase = require('change-case');

function renameAngularComponentTemplate(basePath, oldComponentName, newComponentName) {

  // replace the template name in the code
  const options = {
    files: [
      `${basePath}/${oldComponentName}.component.ts`
    ],
    from: [
      new RegExp(`${oldComponentName}.component.html`, 'g')
    ],
    to: [
      `${newComponentName}.component.html`
    ]
  };
  replaceInFile.sync(options);

  // rename the template file
  fs.renameSync(`${basePath}/${oldComponentName}.component.html`, `${basePath}/${newComponentName}.component.html`);
}

function renameAngularComponentSpec(basePath, oldComponentName, newComponentName) {
  // rename the spec file
  fs.renameSync(`${basePath}/${oldComponentName}.component.spec.ts`, `${basePath}/${newComponentName}.component.spec.ts`);
}
function renameAngularComponentStyle(basePath, oldComponentName, newComponentName) {

  // replace the style name in the code
  const options = {
    files: [
      `${basePath}/${oldComponentName}.component.ts`
    ],
    from: [
      new RegExp(`${oldComponentName}.component.scss`, 'g')
    ],
    to: [
      `${newComponentName}.component.scss`
    ]
  };
  replaceInFile.sync(options);

  // rename the style file
  fs.renameSync(`${basePath}/${oldComponentName}.component.scss`, `${basePath}/${newComponentName}.component.scss`);
}

function renameAngularComponent(basePath, componentPath, oldComponentFilename, newComponentFilename) {

  renameAngularComponentTemplate(`${basePath}/${oldComponentFilename}`, oldComponentFilename, newComponentFilename);
  renameAngularComponentStyle(`${basePath}/${oldComponentFilename}`, oldComponentFilename, newComponentFilename);
  renameAngularComponentSpec(`${basePath}/${oldComponentFilename}`, oldComponentFilename, newComponentFilename);


  const oldPascalName = changeCase.pascalCase(oldComponentFilename);
  const newPascalName = changeCase.pascalCase(newComponentFilename);

  const oldComponentName = `${oldPascalName}Component`;
  const newComponentName = `${newPascalName}Component`;

  // replace the component name in the code
  const options = {
    files: [
      // `${basePath}/**/${oldComponentFilename}.component.ts`
      `${basePath}/**/*.ts`
    ],
    from: [
      new RegExp(`${oldComponentName}`, 'g'), // renames the component name in the code
      new RegExp(`/${oldComponentFilename}.component`, 'g') // renames the component name in the imports paths
    ],
    to: [
      `${newComponentName}`,
      `/${newComponentFilename}.component`
    ]
  };

  replaceInFile.sync(options);

  // rename the component file
  fs.renameSync(`${componentPath}/${oldComponentFilename}.component.ts`, `${componentPath}/${newComponentFilename}.component.ts`);
}

function renameAngularModule(basePath, modulePath, oldModuleFilename, newModuleFilename) {

  const oldPascalName = changeCase.pascalCase(oldModuleFilename);
  const newPascalName = changeCase.pascalCase(newModuleFilename);

  const oldModuleName = `${oldPascalName}Module`;
  const newModuleName = `${newPascalName}Module`;

  // replace the module name in the code
  const options = {
    files: [
      `${basePath}/**/*.ts`
    ],
    from: [
      new RegExp(`${oldModuleName}`, 'g'), // renames the module name in the code
      new RegExp(`/${oldModuleFilename}.module`, 'g') // renames the module name in the imports paths
    ],
    to: [
      `${newModuleName}`,
      `/${newModuleFilename}.module`
    ]
  };

  replaceInFile.sync(options);

  // rename the component file
  fs.renameSync(`${modulePath}/${oldModuleFilename}.module.ts`, `${modulePath}/${newModuleFilename}.module.ts`);
}

function renameDirectory(basePath, oldDirectoryName, newDirectoryName) {
  const options = {
    files: [
      `${basePath}/**/*.ts`
    ],
    from: [
      new RegExp(`/${oldDirectoryName}/`, 'g'), // renames the directory name in the code import paths
    ],
    to: [
      `/${newDirectoryName}/`
    ]
  };

  replaceInFile.sync(options);

  fs.renameSync(`${basePath}/${oldDirectoryName}`, `${basePath}/${newDirectoryName}`);
}

module.exports = {
  renameAngularComponentSpec,
  renameAngularComponentStyle,
  renameAngularComponentTemplate,
  renameAngularComponent,
  renameAngularModule,
  renameDirectory
};