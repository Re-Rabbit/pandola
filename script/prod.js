/**
 * Gulp file 项目构建文件
 *
 * 产品环境
 */
var gulp     = require('gulp')
var del      = require('del')
var reporter = require('gulp-sizereport')
var html     = require('./build-html.js')
var style     = require('./build-style.js')
var paths    = require('./paths.js')


/**
 * 清除目标文件夹
 *
 * @Task
 */
function clean() {
    return del(paths.dist + '/*')
}

/**
 * 编译Html
 *
 * @Task
 */
function buildHtml() {
    return html.min(html.cc(gulp.src(paths.dirs.html)))
	.pipe(reporter({ gzip: true }))
        .pipe(gulp.dest(paths.dist))
}

/**
 * 编译Style
 *
 * @Task
 */
function buildStyle() {
    return html.min(html.cc(gulp.src(paths.dirs.html)))
	.pipe(reporter({ gzip: true }))
        .pipe(gulp.dest(paths.dist))
}


/**
 * Main task
 *
 * @Task
 */
function main() {
    gulp.task('default',
              gulp.series( clean
                          , gulp.parallel(buildHtml, buildStyle)
			 ))
}

main();
