'use strict'

/**
 * Gulp build script
 *
 * @authors @link ./project
 *
 * @description
 * 1.Html
 * 2.CSS
 * 3.Javascript
 * 4.Image
 * 5.Font
 *
 * @warning Development environment only.
 * @todo Add production environment builder.
 * @todo Check tmp dir is exist.
 * @todo need use a public path searcher.
 * @todo fix nunjucks paths.
 * @todo support other files, include index.ext.
 * @todo add api request and response friendly log.
 *
 * v1.1
 * @todo add private/public file own builder.
 * @todo format err message.
 *
 * v2.0
 * @todo add black list.
 */


const gulp = require('gulp')
const sass = require('gulp-sass')
const nunjucks = require('gulp-nunjucks')
const data = require('gulp-data')
const tool = require('gulp-util')
const Nunjucks = require('nunjucks')
const named = require('vinyl-named')
const webpack = require('webpack-stream')
const del = require('del')
const browserSync = require('browser-sync').create()
const webpackConfig = require('./../webpack.config.js')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const logger = require('./log.js')
const log = logger.log
const say = logger.say




/**
 * Paths
 */

// src
const pages = 'pages'
const components = 'components'
const libs = 'libs'
const projectRoot = '.'
// dest
const tmp = 'tmp'
// workspace
let workspace = null
let initBuild = false
const workspaceTmp = '.workspace'
const workspaceTmpFile = `${tmp}/${workspaceTmp}`

/**
 * Files.
 */
const extname = {
    html: 'html',
    js: 'js',
    css: 'scss'
}

const ignorename = '[^#~]'

/**
 * Build page files.
 *
 * @require ignorename
 * @require pages
 *
 * @todo enter point maybe configurable.
 * @todo add other file supports.
 */
function gulpBuildPath(extname, workspace) {
    const work  = workspace || '**'
    const files = 'index.' + extname
    return [pages, work, files].join('/')
}

/**
 * Watch files.
 *
 * @require workspace
 * @require ignorename
 * @require extnames
 * @require pages
 * @require components
 * @require libs
 */
function gulpWatchPath(extname) {
    const files = ignorename + '*.' + extname
    return [pages, components, libs].map(n => `${n}/**/${files}`)
}

function reverseTmpFileName(p) {
    let fmtp = path.relative(process.cwd(), path.normalize(p)).split(path.sep).slice(1)
    return {
	workspace: fmtp[0],
	file: fmtp.slice(1).join('/')
    }
}


/**
 * Gulp entry files.
 *
 * @require page
 * @require ignorename
 * @require extnames
 */
function gulpEntrySrc(paths) {
    const config = {
	base: pages,
	allowEmpty: true
    }
    return gulp.src(paths, config)
}


function clean() {
    return del('tmp/*')
}


function boot(done) {
    setWorkSpace(workspace)(done)
}


function setWorkSpace(value) {
    return function(done) {
        const cb = typeof done === 'function' ? done : function() {}
        fs.writeFile(workspaceTmpFile, value, err => {
            if(err) throw err
	    log.workspace(value)
            workspace = value
            cb()
        })
    }
}

/**
 * Build css.
 */
function replaceScssComponentPath(url) {
    return url
}

function defineSassImporter(filter) {
    return function(url, prev, done) {
        return done({ file: filter(url) })
    }
}

function sassConfig() {
    return {
	outputStyle: 'expanded',
	indentType: 'space',
	importer: defineSassImporter(replaceScssComponentPath)
    }
}

/**
 * Gulp css build
 *
 * @todo fix during time
 */
function css(done) {
    if(!workspace && initBuild) return done()
    return gulpEntrySrc(gulpBuildPath(extname.css, workspace))
	.pipe(data(file => file.start = Date.now()))
	.pipe(sass(sassConfig()).on('error', function(err) {
	    log.errFlag()
	    log.errFile(err.relativePath)
	    log.errPos(err.line, err.column)
	    log.n()
	    sass.logError.bind(this)(err)
	    this.emit('end')
	}))
	.pipe(gulp.dest(tmp))
	.pipe(data(file => {
	    let tp = reverseTmpFileName(file.path)
	    log.css(tp.workspace, tp.file, Date.now() - file.start)
	}))
}


/**
 * Build html.
 *
 * @todo match the file current path.
 */
function nunjucksEnv() {
    let paths = [pages,
		 libs,
		 components,
                 projectRoot]
    
    return new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader(paths)
    )
}

function html(done) {
    if(!workspace && initBuild) return done()
    return gulpEntrySrc(gulpBuildPath(extname.html, workspace))
	.pipe(data(file => file.start = Date.now()))
	.pipe(nunjucks
	      .compile({}, { env: nunjucksEnv() })
	      .on('error', function(err) {
		  log.errFlag()
		  log.errFile(path.relative(process.cwd(), path.normalize(err.fileName)))
		  let m = err.message.match(/\[Line\s?(\d+),\s?Column\s?(\d+)\]/)
		  if(m) log.errPos(m[1], m[2])
		  log.n()
		  console.log(err.message)
		  log.n()
		  this.emit('end')
	      }))
	.pipe(gulp.dest(tmp))
	.pipe(data(file => {
	    let tp = reverseTmpFileName(file.path)
	    log.html(tp.workspace, tp.file, Date.now() - file.start)
	}))
}


/**
 * Build javascript
 */

function javascriptServer(done) {
    
    return gulpEntrySrc(gulpBuildPath(extname.js, workspace))
	.pipe(named())
        .pipe(webpack(webpackConfig, null, (err, stats) => {
	    const res = stats.toJson()
	    log.js(workspace, res.time)
	})).on('error', function(err) {
	    log.errFlag()
	    let mf = err.message.match(/([^]+)Module/)
	    if(mf) log.errFile(path.normalize(mf[1].trim()))
	    let mp = err.message.match(/Unexpected token\s*\((.+)\)\n/)
	    if (mp) log.errPos.apply(null, mp[1].split(':'))
	    log.n()
	    say(err.message)
	    log.n()
	    this.emit('end')
	})
	.pipe(gulp.dest(tmp))
}

function image() {
    let start

    function begin(done) {
	start = Date.now()
	done()
    }

    function end(done) {
	log.image(workspace, Date.now() - start)
	done()
    }
    function task() {
	return gulp.src(`images/**/*.*`)
	    .pipe(gulp.dest(`${tmp}/images`))
    }

    return {
	start: begin,
	end: end,
	task: task
    }
}

function font() {
    let start

    function begin(done) {
	start = Date.now()
	done()
    }

    function end(done) {
	log.font(workspace, Date.now() - start)
	done()
    }
    function task() {
	return gulp.src('./node_modules/ionicons/dist/fonts/**/*.*')
	    .pipe(gulp.dest(`${tmp}/fonts`))
    }

    return {
	start: begin,
	end: end,
	task: task
    }
}


/**
 * Browser server
 */


function reload(done) {
    browserSync.reload()
    done()
}

function reportBrowserInfo(workspace, port) {
    return function() {
	log.browser(workspace, `http://localhost:${port}/${workspace}/`)
    }
}

function defineWatcher(paths, handle, reporter) {
    gulp.watch(paths, handle).on('change', reporter)
}

function reversePathToType(path) {
    if(path.indexOf(pages) != -1) return chalk.red('@page')
    if(path.indexOf(components) != -1) return chalk.yellow('@component')
    if(path.indexOf(libs) != -1) return chalk.green('@lib')
    return ''
}

function reportFileChange(path, stat) {
    reversePathToType(path)
    log.file(`${reversePathToType(path)} ${path}`)
}

function noop() {}

function switchWorkspaceMiddleware(req, res, next) {
    const matched = req.url.match(/^\/(\w+)\/$/)
    //console.log(matched, req.url)
    if(matched && matched[1] != workspace) {
	setWorkSpace(matched[1])(browserSync.reload)
	// Disable cache because when browser history back which can't trigger setWorkSpace
	res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store')
    }
    next()
}

function initBuildDone(done) {
    initBuild = true
    done()
}

const browserServerPort = 8888
const openWhenServerStar = false

function browserServer(done) {

    browserSync.init({
        port: browserServerPort,
	ui: false,
	logLevel: 'silent',
	open: openWhenServerStar,
	reloadOnRestart: true,
        startPath: `/${workspace || 'index'}/`,
        server: {
            baseDir: tmp
        },
	middleware: switchWorkspaceMiddleware
    }, reportBrowserInfo(workspace, browserServerPort))

    defineWatcher(gulpWatchPath(extname.css), gulp.series(css, reload), reportFileChange)
    defineWatcher(gulpWatchPath(extname.html), gulp.series(html, reload), reportFileChange)
    defineWatcher(gulpWatchPath(extname.js), noop, reportFileChange)
    defineWatcher(workspaceTmpFile, gulp.series(css, html, reload), noop)

    done()
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
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
        .use(morgan('dev'))
        .use('/api', apiRouter())
        .listen(port)

    log.api(workspace, url)
}

/**
 * Default task.
 */

function main() {
    
    let f = font()
    let i = image()
    
    gulp.task('default', gulp.series(
	clean,
	gulp.parallel(css,
		      html,
		      gulp.series(i.start, i.task, i.end),
		      gulp.series(f.start, f.task, f.end)),
	initBuildDone,
	gulp.parallel(browserServer,
		      javascriptServer,
		      apiServer,
		      boot)))
}





main(' Gulp init here :) ')
