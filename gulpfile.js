'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gutil = require("gulp-util");

gulp.task('watch', function(){
  gulp.watch("gulpfile.js", ["scripts"]);
  gulp.watch("./app/assets/js/*", ['scripts']);
});

gulp.task('scripts', function() {
  gulp.src([
    './app/assets/js/jquery-1.11.3.min.js',
    './app/assets/js/vendor_highmaps.js',
    './app/assets/js/moment.js',
    './app/assets/js/material.min.js',
    './app/assets/js/vue.min.js',
    './app/assets/js/vue-resource.min.js',
    './app/assets/js/knayi-myscript.js',
    './app/assets/js/search.js',
    './app/assets/js/campaign-data.js',
    './app/assets/js/app.js',
    './app/assets/js/dashboard.js',
    './app/assets/js/eventTracker.js'
  ])
  // .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('./public/js/'));

  gulp.src([
    './app/assets/js/marker_with_label_packed.js',
    './app/assets/js/marker_clusterer.js',
    './app/assets/js/floods_map.js',
  ])
  // .pipe(uglify())
  .pipe(concat('map.min.js'))
  .pipe(gulp.dest('./public/js/'));
});


gulp.task('default', ['scripts', 'watch']);

gulp.task('production', ['scripts']);
