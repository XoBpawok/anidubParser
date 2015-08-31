var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var $ = require('gulp-load-plugins')();

gulp.task('scripts', function() {
  return browserify({
      paths: ['./node_modules', 'client/src/js/'],
      entries: ['client/src/js/index.js'],
      transform: ['reactify'],
      debug: true
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('client/build/js/'));
});

gulp.task('styles', function() {
  return sass('client/src/scss/main.scss', {
      style: 'expanded'
    })
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('client/build/css/'));
});

gulp.task('images', function() {
  return gulp.src('client/src/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('client/dist/images'));
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch('client/src/**/*.js', ['scripts']);
  gulp.watch('client/src/**/*.scss', ['styles']);
});

gulp.task('build', ['styles', 'styles']);

gulp.task('default', ['watch'], function() {});