/**
 * Gulp file 项目构建文件
 *
 * 开发环境
 */
<<<<<<< HEAD
var gulp = require('gulp')
var del = require('del')
var html = require('./build-html.js')
var style = require('./build-style.js')
var paths = require('./paths.js')
=======


// @Todo add Javascript builder.

var gulp        = require('gulp')
var del         = require('del')
var html        = require('./build-html.js')
var style       = require('./build-style.js')
var paths       = require('./paths.js')
>>>>>>> 3085fe9d5bdda7a37207ba9d0b12709d8451478e
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
        .pipe(gulp.dest(paths.tmp + '/styles'))
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
<<<<<<< HEAD
        bsReload()
        done()
=======
	bsReload()
	done()
>>>>>>> 3085fe9d5bdda7a37207ba9d0b12709d8451478e
    }

    // start server
    function server() {
<<<<<<< HEAD
        browserSync.init({
            port: 8888,
            server: {
                baseDir: paths.tmp
            }
        })
=======
	browserSync.init({
	    port: 8888,
            server: {
		baseDir: paths.tmp
            }
	})
>>>>>>> 3085fe9d5bdda7a37207ba9d0b12709d8451478e
    }

    // watcher
    function watch() {
<<<<<<< HEAD
        server()
=======
	server()
>>>>>>> 3085fe9d5bdda7a37207ba9d0b12709d8451478e
        gulp.watch(paths.dirs.html, gulp.series(buildHtml, reload))
        gulp.watch(paths.dirs.styleSources, gulp.series(buildStyle, reload))
    }

    // export
    gulp.task('default',
<<<<<<< HEAD
        gulp.series(clean
            , gulp.parallel(buildHtml
                , buildStyle
            )
            , watch
        ))
=======
              gulp.series( clean
                         , gulp.parallel( buildHtml
                                        , buildStyle
                                        )
			 , watch
			 ))
>>>>>>> 3085fe9d5bdda7a37207ba9d0b12709d8451478e
}


main()
