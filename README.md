
# Angular 4 Library Project With Aot And Sass

## Prerequisites

1. node v7.10.0 < v8
2. angular CLI

`npm install -g @angular/cli`

## installation

1. npm install

## build and test

1. npm run build
1. npm run test


## build system

1. cleans the build directory
2.  copy and inlines all the resouces in .aot/, 
    copy all the templates next to the components 
    this step transform all scss into css
    embeds all the html/css code into the components
    - required tools: gulp, 
3. runs the ngc compiler with aot to transpile into js
    this includes all the necesary files to be released
4. move the .aot/ to dist/ and copies the package.json to dist/
