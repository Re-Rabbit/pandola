var gulp = require('gulp');
var del = require('del');


function clean(done) {
    return del(dirs.tmp, done);
}


function buildHtml() {
    return gulp.src(dirs.src + '/pages/*.html')
        .pipe(gulp.dest(dirs.dev ));
};


function main() {

    gulp.task('clean', clean);
    gulp.task('html', buildHtml);

    function watch() {
        gulp.watch(dirs.src + '/pages/*.html', gulp.series('html'));
    }

    gulp.task('dev',
              gulp.series('clean',
                          gulp.parallel('html', watch)));

    gulp.task('default', gulp.series('dev'));
}


var dirs = {
    src: 'src',
    dev: 'tmp',
    prod: 'dist'
};

main();
