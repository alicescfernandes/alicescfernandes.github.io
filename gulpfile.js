const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const sassOptions = {outputStyle: 'compressed'}
gulp.task('default', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.watch(['./scss/**/*.scss'], gulp.parallel(["default"]));