

// @Todo add Javascript builder.

var gulp        = require('gulp')
var del         = require('del')
var html        = require('./build-html.js')
var style       = require('./build-style.js')
var script      = require('./build-script.js')
var font        = require('./build-font.js')
var apiServer   = require('./mock-server.js')
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
        .pipe(gulp.dest(paths.tmp + '/styles'))
}

/**
 * 编译Font
 *
 * @Task
 */
function buildFont() {
    return font.cc(gulp.src(paths.dirs.libs.font))
        .pipe(gulp.dest(paths.tmp + '/fonts'))
}

/**
 * 编译Script
 *
 * @Task
 */
function buildScript() {
    return font.cc(gulp.src(paths.dirs.script))
        .pipe(gulp.dest(paths.tmp + '/scripts'))
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
        gulp.watch(paths.dirs.styleSources, gulp.series(buildStyle, reload))
	gulp.watch(paths.dirs.script, gulp.series(buildScript, reload))
    }

    // export
    gulp.task('default',
              gulp.series(clean,
			  gulp.parallel(buildHtml,
					buildStyle,
					buildScript,
					buildFont),
			  gulp.parallel(watch,
					apiServer)
			 ))
}


main()
