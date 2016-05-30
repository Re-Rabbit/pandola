var gulp = require('gulp')
var ghpages = require('gh-pages')

var del  = require('del')
var html = require('./build-html.js')
var spawn = require('child_process').spawn

/**
 * 清除目标文件夹.
 *
 * @Task
 */
function clean() {
    return del(PATH_PROD + '/*')
}

/**
 * 编译Html.
 *
 * @Task
 */
function buildHtml() {
    return html.cc(gulp.src(dirs.html))
        .pipe(gulp.dest(PATH_TMP))
}

function deploy(done) {
    ghpages.publish(PATH_TMP, { clone: './.publish' });
}


/**
 * Main call.
 */
function main() {
    // export
    gulp.task('default',
              gulp.series( clean
                           , gulp.parallel(buildHtml)
			   , deploy
			 ))
    setTimeout(deploy)
}

var PATH_SRC  = 'src'
var PATH_TMP  = 'tmp'
var PATH_PROD = 'dist'

var dirs = {
    html: PATH_SRC + '/pages/*.html'
};

main();
