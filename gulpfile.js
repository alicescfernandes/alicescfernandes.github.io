const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

const sassOptions = {outputStyle: 'compressed'};
const autoPrefixerOptions = {
    cascade:false
}
gulp.task('default', function () {
    return gulp.src('./scss/**/*.scss')
    .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.watch(['./scss/**/*.scss'], gulp.parallel(["default"]));