// including plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    server = require('tiny-lr')(),
    less = require("gulp-less"),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

// translate less file, then minify it
gulp.task('less', function () {
    gulp.src('assets/less/app/app.less')
        .pipe(less())
        .pipe(gulp.dest('public/css/'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css/'))
        .pipe(gulp.dest('_site/public/css/'))
});

gulp.task('watch-less', function () {
    gulp.watch([
        'assets/less/app/*',
        'assets/less/app/*/*',
    ], ['less']);

    livereload.listen();

    gulp.watch('_site/public/css/app.min.css').on('change', livereload.changed);
});

gulp.task('default', ['watch-less']);
