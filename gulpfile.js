'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const html = require('gulp-posthtml');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


//Сборка в разрботку
gulp.task('sass', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('source/css'))
  .pipe(browserSync.stream()));

gulp.task('server', () => {
  browserSync.init({
    server: 'source'
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('source/**/*.html').on('change', browserSync.reload);
  gulp.watch('source/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('start', gulp.series('sass', 'server'));


//Оптимизация изображений
gulp.task('images', () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'));
});

gulp.task('picture', gulp.series('images', 'webp'));


//Сборка в продакшн
gulp.task('buildSass', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream()));

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(html())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('copy', () => {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/swiper/**',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('buildServer', () => {
  browserSync.init({
    server: 'build'
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('buildSass'));
  gulp.watch('source/**/*.html', gulp.series('html'));
  gulp.watch('source/js/**/*.js', gulp.series('js'));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'js', 'buildSass', 'buildServer'));
