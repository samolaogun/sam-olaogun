const gulp = require('gulp');
const inline = require('gulp-inline');

gulp.task('build', function() {
    return gulp.src('./public/room/**/**.html')
        .pipe(inline({
            base: './public/room/**/'
        }))
        .pipe(gulp.dest('./public/room-bin/'));
});