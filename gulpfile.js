'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var ejs = require("gulp-ejs");
var gutil = require("gulp-util");

gulp.task('watch', function(){
  gulp.watch("gulpfile.js", ["scripts"]);
  gulp.watch("./app/assets/js/*", ['scripts']);
  gulp.watch("./app/templates/partials/*", ['templates']);
  gulp.watch("./app/templates/*", ['templates']);
});

gulp.task('scripts', function() {
  return gulp.src([
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
    './app/assets/js/floods_map.js',
    './app/assets/js/dashboard.js'
  ])
  // .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('templates', function(){
  gulp.src(["./app/templates/*.ejs", "!./app/templates/partials/*.ejs"])
  .pipe(ejs({
    msg: "Hello Gulp!"
  }, {ext: '.html'}).on('error', gutil.log))
  .pipe(gulp.dest("./app/views"));
});

gulp.task('default', ['scripts', 'templates', 'watch']);

gulp.task('production', ['scripts', 'templates']);
