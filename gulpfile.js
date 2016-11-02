'use strict';

var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var nunjucksRender  = require('gulp-nunjucks-render');
var prettify        = require('gulp-html-prettify');
var removeLines     = require('gulp-remove-empty-lines');

// All HTML rendering related ops
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['app/templates']
  }))
  // Remove empty lines, comments
  .pipe(removeLines({
    removeComments: true
  }))
  // Indents html
  .pipe(prettify({indent_char: ' ', indent_size: 2}))
  // Output files in app folder
  .pipe(gulp.dest('app'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'nunjucks'], function() {
  browserSync.init({
      server: "./app"
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/pages/**/*.+(html|nunjucks)", ['nunjucks']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/pages/**/*.+(html|nunjucks)").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

