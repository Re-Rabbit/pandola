/**
 * Gulp file 项目构建文件
 *
 * 项目部署到 github gh-pages
 */
var gulp    = require('gulp')
var gutil   = require('gulp-util')
var ghpages = require('gh-pages')
var open    = require('open')
var del     = require('del')
var html    = require('./build-html.js')
var style   = require('./build-style.js')
var paths   = require('./paths.js')
var config  = require('./../package.json')


/**
 * 清理目标文件夹
 *
 * @Task
 */
function cleanTmp() {
    return del(paths.tmp + '/*')
}

function cleanPublish() {
    return del(paths.publish + '/*')
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
 * 部署到github gh-pages分支
 *
 * @Task
 */
function deploy(done) {
    // github gh-pages url.
    var url = config.description

    ghpages.publish(paths.tmp, { clone: paths.publish }, function(err) {
	      if(err) {
	          gutil.log(err)
	          return done()
	      }

	      gutil.log('deploy success and open with ' + url)
	      open(url)
	      done()
    })
}


/**
 * Main task
 *
 * @Task
 */
function main() {
    gulp.task('default',
              gulp.series( gulp.parallel(cleanTmp, cleanPublish)
                           , gulp.parallel(buildHtml, buildStyle)
			                     , deploy
			                   ))
}

main()
