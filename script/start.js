var gulp = require('gulp')
var gutil = require('gulp-util')
var express = require('express')
var cors = require('cors')
var compression = require('compression')
var browserSync = require('browser-sync').create()
var build = require('./libbuild')


function apiRouter() {
    var router = express.Router()
    require('../pages/icon/api.js')(router)
    require('../pages/auth/api.js')(router)
    return router
}

function apiServer() {
    var port = 7777
    var url = 'http://localhost:' + port
    express()
        .use(cors())
        .use(compression())
        // .use(morgan('dev'))
        // .use('/', express.static(paths.tmp, { extensions: ['html'] }))
        .use('/api', apiRouter())
        .listen(port)

    gutil.log('server started on ' + url)
}


function main() {
    function reload(cb) {
        browserSync.reload()
        cb()
    }

    function server() {
        browserSync.init({
            port: 8888,
            logFileChanges: true,
            startPath: '/index/',
            server: {
                baseDir: build.paths.tmp,
                middleware: function (req, res, next) {
                    // @Todo add proxy server.
                    return next()
                }
            }
        })
    }

    // watcher
    function watch() {
        server()
        gulp.watch(build.paths.dirs.html, gulp.series(build.buildHtml, reload))
        gulp.watch(build.paths.dirs.style, gulp.series(build.buildStyle, reload))
        gulp.watch(build.paths.dirs.script, gulp.series(build.buildScript, reload))
        gulp.watch(build.paths.dirs.image, gulp.series(build.buildImage, reload))
        gulp.watch(build.paths.dirs.api, gulp.series(reload))
    }

    gulp.task
        ('default'
        , gulp.series
            (build.buildAll
            , gulp.parallel
                (watch
                , apiServer
                )
            )
        )
}

main()