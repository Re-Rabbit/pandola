var gulp = require('gulp')
var gutil = require('gulp-util')
var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var compression = require('compression')
var browserSync = require('browser-sync').create()
var cached = require('gulp-cached')
var remember = require('gulp-remember')
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
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
        .use(morgan('dev'))
        .use('/api', apiRouter())
        .listen(port)

    gutil.log('server started on ' + url)
}


function main() {
    function reload(done) {
        browserSync.reload()
        done()
    }

    function server() {
        browserSync.init({
            port: 8888,
            startPath: '/index/',
            server: {
                baseDir: build.paths.tmp
            }
        })
    }

    // watcher
    function watch() {
        server()
        gulp.watch(build.paths.dirs.html, gulp.series(build.buildHtml, reload))
        gulp.watch(build.paths.dirs.style, gulp.series(build.buildStyle, reload))
        
        gulp.watch(build.paths.dirs.image, gulp.series(build.buildImage, reload))
        gulp.watch(build.paths.dirs.api, gulp.series(reload))
	gulp.watch(build.paths.tmp + '/**/*.js', { delay: 1000 }, gulp.series(reload))

    }

    gulp.task
    ('default'
     , gulp.series
     (build.buildAll
      , gulp.parallel
      (watch
       , apiServer
       , build.buildScript
      )
     )
    )
}

main()
