/**
 * Gulp file 项目构建文件
 *
 * 项目部署到 github gh-pages
 */
var gulp = require('gulp')
var gutil = require('gulp-util')
var ghpages = require('gh-pages')
var open = require('open')
var del = require('del')
var build = require('./libbuild')
var config = require('./../package.json')


/**
 * 清理目标文件夹
 *
 * @Task
 */
function cleanTmp() {
    return del(build.paths.tmp + '/*')
}

function cleanPublish() {
    return del(build.paths.publish + '/*')
}


/**
 * 部署到github gh-pages分支
 *
 * @Task
 */
function deploy(done) {
    // github gh-pages url.
    var url = config.description

    ghpages.publish(build.paths.tmp, { clone: build.paths.publish }, function (err) {
        if (err) {
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
        gulp.series(
            gulp.parallel(cleanTmp, cleanPublish)
            , build.buildAll
            , deploy
        )
    )
}

main()
