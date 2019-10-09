const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webp = require('gulp-webp');

sass.compiler = require('node-sass');

const sassOptions = {outputStyle: 'compressed'};
const autoPrefixerOptions = {
    cascade:false
}
gulp.task('default', function () {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


gulp.task('images', () =>
    gulp.src('src/img/*')
        .pipe(webp())
        .pipe(gulp.dest('./img'))
);

gulp.watch(['./scss/**/*.scss'], gulp.parallel(["default"]));