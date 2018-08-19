

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify');

gulp.task('sass', function () {
  return gulp.src('./assets/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/styles/*.scss', ['sass']);
});
