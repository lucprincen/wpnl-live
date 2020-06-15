/**
 * Created by Dmytro on 3/27/2016.
 */
const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    htmlprettify = require('gulp-html-prettify'),
    autoprefixer = require('gulp-autoprefixer');

/* pathConfig*/
const pugWatchPath = './templates/**/*.pug',
    sassWatchPath = './assets/src/sass/**/*.scss';
    
gulp.task('sass', function () {
    return gulp.src('./assets/src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('pug', function () {
    return gulp.src('templates/!(_)*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(htmlprettify({ 'indent_char': '\t', 'indent_size': 1, 'preserve-newlines': true }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch(sassWatchPath, gulp.series('sass'));
    gulp.watch(pugWatchPath, gulp.series('pug'));
});