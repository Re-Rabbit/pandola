/**
 * Gulp file 项目构建文件
 *
 * 产品环境
 */
var gulp = require('gulp')
var del  = require('del')
var reporter = require('gulp-sizereport')

var html = require('./build-html.js')


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
    return html.min(html.cc(gulp.src(dirs.html)))
	.pipe(reporter({ gzip: true }))
        .pipe(gulp.dest(PATH_PROD))
}


/**
 * Main call.
 */
function main() {
    // export
    gulp.task('default',
              gulp.series(clean,
                          gulp.parallel(buildHtml
					
				       )
			 ))
}

var PATH_SRC  = 'src'
var PATH_TMP  = 'tmp'
var PATH_PROD = 'dist'

var dirs = {
    html: PATH_SRC + '/pages/*.html'
};

main();
