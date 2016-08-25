'use strict';

const BROWSER   = require('browser-sync').create();
const BABEL     = require('gulp-babel');
const CONCAT    = require('gulp-concat');
const GULP      = require('gulp');
const GULPIF    = require('gulp-if');
const RENAME    = require('gulp-rename');
const SASS      = require('gulp-sass');
const SOURCE    = require('gulp-sourcemaps');
const UTIL      = require('gulp-util');
const UGLY      = require('gulp-uglify');
const UGLY      = require("gulp-uglify");

let CONFIG =  {
  client: {
    js: ['./app/views', './app/service'],
    saas: {}
  },
  vendor: {
    js: {}
  },
  output: {
    js: '',
    css: ''
  }
};

GULP.task('build:all', ['css:vendor', 'image', 'fonts', 'js:client', 'js:vendor', 'sass', 'vulcanize']);
GULP.task('build:min', ['js:client', 'sass', 'vulcanize']);
GULP.task('build', ['css:vendor', 'js:client', 'js:vendor', 'sass', 'vulcanize']);

GULP.task('browser', browser);
GULP.task('js:client', jsClient);
GULP.task('js:watch', ['js:client'], jsWatch);
GULP.task('js:vendor', jsVendor);
GULP.task('sass', sass);
GULP.task('sass:watch', ['sass'], sassWatch);
GULP.task('setup', ['js:client', 'js:vendor', 'css:vendor']);
GULP.task('serve', ['browser', 'watch']);
GULP.task('watch', ['sass:watch', 'js:watch']);

function browser() {
  BROWSER.init({
    open: 'external',
    host: {
      target: 'ipv.app',
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    proxy: 'ipv.app',
    port: 3000,
    logLevel: 'info',
    logFileChanges: false,
    browser: ['google chrome'],
    notify: true
  });
}

function jsClient() {
  return GULP.src(CONFIG.client.js)
    .pipe(SOURCE.init({loadMaps: true}))
    .pipe(GULPIF(1, BABEL({presets: ['es2015']})))
    .pipe(CONCAT('app.min.js'))
    .pipe(UGLY())
    .pipe(SOURCE.write('.'))
    .pipe(GULP.dest(CONFIG.output.js))
    .on('end', function(e) {success('js:client'); });
}

function jsWatch() {
  GULP.watch(CONFIG.client.js, ['js:client'], BROWSER.reload);
}

function jsVendor() {
  return GULP.src(CONFIG.vendor.js)
    .pipe(SOURCE.init({loadMaps: true}))
    .pipe(CONCAT('vendors.js'))
    .pipe(UGLY())
    .pipe(SOURCE.write())
    .pipe(GULP.dest(CONFIG.output.js))
    .on('end', function() {success('js:vendor'); });
}

function sass() {
  return GULP.src(CONFIG.client.sass)
    .pipe(SASS({outputStyle: 'compressed'}))
    //.pipe(RENAME({'suffix':'-compiled'}))
    .pipe(GULP.dest(CONFIG.output.css));
}

function sassWatch() {
  GULP.watch(CONFIG.client.sass, ['sass'], function() {
    BROWSER.reload({stream: true});
  });
}

function success(msg) {
  msg = msg || '';
  UTIL.log(UTIL.colors.green('Successfully ran:', UTIL.colors.blue.bold(msg)));
}
