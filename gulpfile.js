'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gutil = require("gulp-util");

// JS Files Path
var APP_JS_PATH = './app/assets/js/';
var NODE_JS_PATH = './node_modules/';

// JS file lists for application
var APP_JS_LISTS = [
  APP_JS_PATH + 'jquery-1.11.3.min.js',
  APP_JS_PATH + 'vendor_highmaps.js',
  APP_JS_PATH + 'moment.js',
  APP_JS_PATH + 'material.min.js',
  NODE_JS_PATH + 'angular/angular.min.js',
  NODE_JS_PATH + 'angular-sanitize/angular-sanitize.min.js',
  APP_JS_PATH + 'knayi-myscript.js',
  APP_JS_PATH + 'utils.js',
  APP_JS_PATH + 'directives/scrolled-handler.js',
  APP_JS_PATH + 'app.js',
  APP_JS_PATH + 'services/organization.js',
  APP_JS_PATH + 'controllers/organization.js',
  APP_JS_PATH + 'search.js',
  APP_JS_PATH + 'campaign-data.js',
  APP_JS_PATH + 'dashboard.js',
  APP_JS_PATH + 'eventTracker.js'
];

// JS file lists for map
var MAP_JS_LISTS = [
  APP_JS_PATH + 'marker_with_label_packed.js',
  APP_JS_PATH + 'marker_clusterer.js',
  APP_JS_PATH + 'floods_map.js',
];

// Watch task for gulp
gulp.task('watch', function () {
  gulp.watch("gulpfile.js", ["scripts"]);
  gulp.watch("./app/assets/js/**/*.js", ['scripts']);
});

// Script gulp task for production
gulp.task('scripts-production', function () {
  gulp.src(APP_JS_LISTS)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./public/js/'));

  gulp.src(MAP_JS_LISTS)
    .pipe(uglify())
    .pipe(concat('map.min.js'))
    .pipe(gulp.dest('./public/js/'));
});

// Script gulp task for developement
gulp.task('scripts', function () {
  gulp.src(APP_JS_LISTS)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./public/js/'));

  gulp.src(MAP_JS_LISTS)
    .pipe(concat('map.min.js'))
    .pipe(gulp.dest('./public/js/'));
});


gulp.task('default', ['scripts', 'watch']);

gulp.task('production', ['scripts-production']);
