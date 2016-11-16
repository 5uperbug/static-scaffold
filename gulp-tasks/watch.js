var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function() {
  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/pages/**/*.+(html|nunjucks)", ['nunjucks']);
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/css/*.css", browserSync.reload);
});
