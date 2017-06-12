var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('ngApp/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' })).pipe(gulp.dest('ngApp/css'));
});
gulp.task('sass:watch', function () {
    return gulp.watch('ngApp/sass/**/*.scss', ['sass']);
});
