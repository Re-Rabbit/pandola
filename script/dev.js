/**
 * Gulp file 项目构建文件
 *
 * 开发环境
 */
var gulp   = require('gulp')
var del    = require('del')
var html   = require('./build-html.js')
var server = require('./build-server.js')
var paths  = require('./paths.js')

/**
 * 清除目标文件夹
 *
 * @Task
 */
function clean() {
    return del(paths.tmp + '/*')
}

/**
 * 编译Html
 *
 * @Task
 */
function buildHtml() {
    return html.cc(gulp.src(paths.dirs.html))
        .pipe(gulp.dest(paths.tmp))
}


/**
 * Main task
 *
 * @Task
 */
function main() {
    // watcher
    function watch() {
        return gulp.watch(paths.dirs.html, gulp.series(buildHtml))
    }

    // export
    gulp.task('default',
              gulp.series( clean
                         , gulp.parallel(buildHtml)
			 , server(paths.tmp)
			 , watch
			 ))
}

main();
