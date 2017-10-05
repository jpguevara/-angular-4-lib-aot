const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const ext_replace = require('gulp-ext-replace');
var rimraf = require('gulp-rimraf');
const inlineResources = require('./scripts/gulp/inline-resources');
const magicImporter = require('node-sass-magic-importer');

gulp.task('copy-and-inline-resource', copySrc);


const include = [];
const exclude = [
  '!node_modules/**/*',
  '!release/**/*'];

const srcPath = './src';
const destPath = './.aot/src';

function copyHtml() {
  gulp.src(['**/*.html', ...exclude])
    .pipe(gulp.dest(destPath)).on('end', copyScss);
}

function copySrc() {
  gulp.src([`${srcPath}/**/*.ts`, `${srcPath}/**/*.html`, `${srcPath}/**/*.scss`])
    .pipe(gulp.dest(destPath)).on('end', copyScss);
}

function deleteHtmlAndSassFiles() {
  gulp.src([`${destPath}/**/*.html`, `${destPath}/**/*.scss`], { read: false })
    .pipe(rimraf());
}


// function copyAssets() {
//   gulp.src(['./assets/**/*', '!node_modules/**/*', '!release/**/*'])
//     .pipe(gulp.dest('./release/assets')).on('end', copyScss);
// }
function copyScss() {
  gulp.src([`${destPath}/**/*.scss`])
    // compile the sass into css
    .pipe(sass({
      includePaths: path.resolve('./node_modules/'),
      importer: magicImporter
    }).on('error', sass.logError))
    // sass has been compiled, but we will keep the scss extension in the resulting css files
    // this is needed to match the component styleUrls fisical file
    .pipe(ext_replace('.scss'))
    // with the all the files ready, we can inline the resources 
    .pipe(gulp.dest(destPath))
    .on('end', inlineResource)
    .on('end', deleteHtmlAndSassFiles);
}

function inlineResource() {
  console.log('Starting inlineResource...');
  inlineResources(`${destPath}/**`);
  console.log('Finished inlineResource...');
}

gulp.task('default', ['copy-and-inline-resource']);