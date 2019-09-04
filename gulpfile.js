'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.stream());
});

gulp.task('server', function () {
  browserSync.init({
    server: 'source'
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('source/**/*.html').on('change', browserSync.reload);
  gulp.watch('source/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('start', gulp.series('sass', 'server'));
