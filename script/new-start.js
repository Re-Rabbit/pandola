var gulp = require('gulp')
var gutil = require('gulp-util')
var del = require('del')
var sass = require('gulp-sass')
var express = require('express')
var cors = require('cors')
var named = require('vinyl-named')
var path = require('path')
var compression = require('compression')
var webpack = require('webpack-stream')
var nunjucks = require('gulp-nunjucks')
var nunjucks_impl = require('nunjucks')
var browserSync = require('browser-sync').create()

var src = './pages'

var paths = {
    src: src,
    tmp: './tmp',
    dirs: {
        html: src + '/**/index.html',
        style: src + '/**/index.scss',
        script: src + '/**/index.js',
        image: src + '/**/images/*',
        api: src + '/**/api.js',
        font: './node_modules/ionicons/dist/fonts/**/*.*'
    }
}

function clean() {
    return del(paths.tmp + '/*')
}

function buildHtml() {
    var nunjucks_env = new nunjucks_impl.Environment(new nunjucks_impl.FileSystemLoader(src + '/..'));
    return gulp
        .src(paths.dirs.html, { base: src })
        .pipe(nunjucks.compile({}, { env: nunjucks_env }).on('error', console.log))
        .pipe(gulp.dest(paths.tmp))
}

function buildStyle() {
    return gulp
        .src(paths.dirs.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.tmp))
}

function buildScript() {
    var webpackConfig = {
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel',
                query: { compact: false }
            }, {
                    test: /\.njk$/,
                    loader: 'nunjucks'
                }]
        },
        resolve: {
            root: [
                // path.resolve('./src/pages/templates'),
                path.resolve(src),
                path.resolve('./')
            ]
        }
    }

    return gulp
        .src(paths.dirs.script, { base: src })
        .pipe(named())
        .pipe(webpack(webpackConfig).on('error', console.log))
        .pipe(gulp.dest(paths.tmp))
}

function buildFont() {
    return gulp
        .src(paths.dirs.font)
        .pipe(gulp.dest(paths.tmp + '/fonts'))
}

function buildImage() {
    return gulp
        .src(paths.dirs.image)
        .pipe(gulp.dest(paths.tmp))
}


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
            server: {
                baseDir: paths.tmp,
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
        gulp.watch(paths.dirs.html, gulp.series(buildHtml, reload))
        gulp.watch(paths.dirs.style, gulp.series(buildStyle, reload))
        gulp.watch(paths.dirs.script, gulp.series(buildScript, reload))
        gulp.watch(paths.dirs.image, gulp.series(buildImage, reload))
        gulp.watch(paths.dirs.api, gulp.series(reload))
    }

    gulp.task
        ('default'
        , gulp.series
            (gulp.parallel
                (buildHtml
                , buildStyle
                , buildScript
                , buildFont
                , buildImage
                )
            , gulp.parallel
                (watch
                , apiServer
                )
            )
        )
}

main()