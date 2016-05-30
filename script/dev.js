/**
 * Gulp file 项目构建文件
 *
 * 开发环境
 */
var gulp = require('gulp')
var del  = require('del')

var html = require('./build-html.js')
var server = require('./build-server.js')

/**
 * 清除目标文件夹.
 *
 * @Task
 */
function clean() {
    return del(PATH_TMP + '/*')
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


/**
 * Main call.
 */
function main() {
    // watcher
    function watch() {
        gulp.watch(dirs.html, gulp.series(buildHtml))
    }

    // export
    gulp.task('default',
              gulp.series( clean
                           , gulp.parallel(buildHtml)
			   , server(PATH_TMP)
			   , watch
			 ))
}

var PATH_SRC  = 'src'
var PATH_TMP  = 'tmp'
var PATH_PROD = 'dist'

var dirs = {
    html: PATH_SRC + '/pages/*.html'
};

main();
