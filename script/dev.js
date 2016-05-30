/**
 * Gulp file 项目构建文件
 *
 * 开发环境
 */
var gulp        = require('gulp')
var del         = require('del')
var html        = require('./build-html.js')
var style       = require('./build-style.js')
var paths       = require('./paths.js')
var browserSync = require('browser-sync').create()

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
 * 编译Style
 *
 * @Task
 */
function buildStyle() {
    return style.cc(gulp.src(paths.dirs.style))
        .pipe(gulp.dest(paths.tmp))
}

/**
 * Main task
 *
 * @Task
 */
function main() {

    var bsReload = browserSync.reload

    // reload files
    function reload(done) {
	      bsReload()
	      done()
    }

    // start server
    function server() {
	      browserSync.init({
	          port: 8888,
            server: {
		            baseDir: paths.tmp
            }
	      })
    }

    // watcher
    function watch() {
	      server()
        gulp.watch(paths.dirs.html, gulp.series(buildHtml, reload))
        gulp.watch(paths.dirs.style, gulp.series(buildStyle, reload))
    }

    // export
    gulp.task('default',
              gulp.series( clean
                           , gulp.parallel(buildHtml
                                           , buildStyle
                                          )
			                     , watch
			                   ))
}

main()
