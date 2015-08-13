'use strict';

var path = require("path");
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gutil = require("gulp-util");

// External Library 
var __BOWER = path.join(__dirname, "bower_components");
var __JQUERY = path.join(__BOWER, "jquery/dist/jquery.min.js");
var __MATERIAL_LITE = path.join(__BOWER, "material-design-lite/material.min.js");
var __ANGULAR = path.join(__BOWER, "angular/angular.min.js");
var __ANGULAR_ROUTE = path.join(__BOWER, "angular-route/angular-route.min.js");
var __ANGULAR_SANITIZE = path.join(__BOWER, "angular-sanitize/angular-sanitize.min.js");
var __MOMENT = path.join(__BOWER, "moment/min/moment.min.js");
var __HIGHMAP = path.join(__BOWER, "highmaps-release/highmaps.js");

// Internal Library
var __LIBS = path.join(__dirname, "./app/assets/js/libs");
var __KNAYI = path.join(__LIBS, 'knayi-myscript.js');
var __MARKER_CULSTERER = path.join(__LIBS, 'marker_clusterer.js');
var __MARKER_WITH_LABEL = path.join(__LIBS, 'marker_with_label_packed.js');
var __EVENT_TRACKER = path.join(__LIBS, 'eventTracker.js');

var DEFAULT = [__JQUERY, __EVENT_TRACKER, __MATERIAL_LITE, __MOMENT, __KNAYI, 
              __ANGULAR, __ANGULAR_SANITIZE];

// JS Paths
function jsPath(_path){
  return path.join(__dirname + "/app/assets/js", _path);
}

function concatDefault(__DEFAULTS, assets, other){
  var paths = [];
  if(assets) paths = assets.map(jsPath);
  if(other) paths = paths.concat(other);
  return __DEFAULTS.concat(paths);
}

var PAGES = {
  "donation": concatDefault(DEFAULT, 
      ['directives/scrolled-handler.js', 
      'services/organization.js', 'controllers/organization.js']),

  "news": concatDefault(DEFAULT, 
      ['directives/scrolled-handler.js',
      'services/newsfeeds.js', 'controllers/newsfeeds.js']),

  "news-form": concatDefault(DEFAULT),
  "form": concatDefault(DEFAULT),

  "flood-locations-map": concatDefault(DEFAULT, 
    ['floods_map.js'],
    [__MARKER_WITH_LABEL, __MARKER_CULSTERER]),

  "campaigns": concatDefault(DEFAULT),
  "about": concatDefault(DEFAULT)
};

// // JS file lists for application
// var APP_JS_LISTS = [
//   APP_JS_PATH + 'jquery-1.11.3.min.js',
//   APP_JS_PATH + 'vendor_highmaps.js',
//   APP_JS_PATH + 'moment.js',
//   APP_JS_PATH + 'material.min.js',
//   NODE_JS_PATH + 'angular/angular.min.js',
//   NODE_JS_PATH + 'angular-sanitize/angular-sanitize.min.js',
//   APP_JS_PATH + 'knayi-myscript.js',
//   APP_JS_PATH + 'directives/scrolled-handler.js',
//   APP_JS_PATH + 'app.js',
//   APP_JS_PATH + 'services/organization.js',
//   APP_JS_PATH + 'controllers/organization.js',
//   APP_JS_PATH + 'search.js',
//   APP_JS_PATH + 'campaign-data.js',
//   APP_JS_PATH + 'dashboard.js',
//   APP_JS_PATH + 'eventTracker.js'
// ];

// // JS file lists for map
// var MAP_JS_LISTS = [
//   APP_JS_PATH + 'marker_with_label_packed.js',
//   APP_JS_PATH + 'marker_clusterer.js',
//   APP_JS_PATH + 'floods_map.js',
// ];

// Watch task for gulp
gulp.task('watch', function () {
  gulp.watch("gulpfile.js", ["scripts"]);
  gulp.watch("./app/assets/js/**/*.js", ['scripts']);
});

// Script gulp task for production
gulp.task('scripts-production', function () {
  Object.keys(PAGES).forEach(function(pagename){
    var dist = path.join(__dirname, "public/js", pagename);
    var paths = PAGES[pagename];
    gulp.src(paths)
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(dist))
  });
});

// Script gulp task for developement
gulp.task('scripts', function () {
  Object.keys(PAGES).forEach(function(pagename){
    var dist = path.join(__dirname, "public/js", pagename);
    var paths = PAGES[pagename];
    gulp.src(paths)
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(dist))
  });
});

gulp.task('default', ['scripts', 'watch']);
gulp.task('production', ['scripts-production']);
