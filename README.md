
# Core project

## Prerequisites

1. node v7.10.0 < v8
2. angular CLI

`npm install -g @angular/cli`

## installation

1. npm install

## build and test

1. npm run build
1. npm run test
    or
   npm run test-watch


## build system

1. cleans the build directory
1. copy and inlines all the resouces in .aot/, 
    copy all the templates next to the components 
    this step transform all scss into css
    embeds all the html/css code into the components
    - required tools: gulp, 
1. runs the ngc compiler with aot to transpile into js
    this includes all the necesary files to be released
4. move the .aot/src to dist/
