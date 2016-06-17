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
 * @todo nunjucks template error then can't auto reload.
 * @todo add webpack toString interface.
 * @todo add init pages build for history operation.
 * @todo need use a public path searcher.
 * @todo fix nunjucks paths.
 * @todo support other files, include index.ext.
 * @fixme change workspace until all reasons compiled.
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
//const reload = require('browser-sync').reload
const webpackConfig = require('./../webpack.config.js')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const logger = require('./log.js')
const log = logger.log
const say = logger.say
const flag = logger.flag
const pad = logger.pad

/**
 * Paths
 */

// src
const pages = 'pages'
const components = 'components'
const libs = 'libs'
// dest
const tmp = 'tmp'
// workspace
var workspace = null
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
function gulpWatchPath(type) {
    const files = ignorename + '*.' + getExtname(extnames, type)
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

function gulpDuringTime(stream, cb) {
    return stream
}

const stylesBuildPath = (workspace) => `${pages}/${workspace ? workspace : '**'}/index.scss`
const stylesWatchPath = () => [pages, components, libs].map(n => `${n}/**/[^#~]*.scss`)

const htmlsBuildPath = (workspace) => `${pages}/${workspace ? workspace : '**'}/index.html`
const htmlsWatchPath = () => [pages, components, libs].map(n => `${n}/**/[^#~]*.html`)

const scriptsBuildPath = (workspace) => `${pages}/${workspace ? workspace : '**'}/index.js`
const scriptsWatchPath = () => [pages, components, libs].map(n => `${n}/**/[^#~]*.js`)


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
function css() {
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
		 `${pages}/${workspace}`,
		 libs,
		 components]
    
    return new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader(paths)
    )
}

function html() {
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

function reload(done) {
    browserSync.reload()
    done()
}

function javascriptServer(done) {
    const jsPath = scriptsBuildPath(workspace)
    
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

var historyApiFallback = require('connect-history-api-fallback')

const broserServerPort = 8888

function browserServer(done) {

    browserSync.init({
        port: broserServerPort,
	ui: false,
	logLevel: 'silent',
	open: false,
	reloadOnRestart: true,
        startPath: `/${workspace}/`,
        server: {
            baseDir: tmp
        },
	middleware: (req, res, next) => {
	    const matched = req.url.match(/^\/(\w+)\/$/)
	    //console.log(matched, req.url)
	    if(matched && matched[1] != workspace) {
		setWorkSpace(matched[1])(browserSync.reload)
		// Disable cache because when browser history back which can't trigger setWorkSpace
		res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store')
	    }

	    next()
	},
    }, () => {
	log.browser(workspace, `http://localhost:${broserServerPort}/${workspace}/`)
    })
    
    gulp.watch(stylesWatchPath(), gulp.series(css, reload))
	.on('change', (path, stats) => {
	    log.file(`${chalk.yellow('@component')} ${path}`)
	})

    gulp.watch(htmlsWatchPath(), gulp.series(html, reload))
	.on('change', (path, stats) => {
	    log.file(`${chalk.yellow('@component')} ${path}`)
	})

    gulp.watch(scriptsWatchPath())
	.on('change', (path, stats) => {
	    log.file(`${chalk.yellow('@component')} ${path}`)
	})

    gulp.watch(workspaceTmpFile, gulp.series(css,
					     html,
					     reload))

    done()
}


gulp.task('default', gulp.series(clean,
				 gulp.parallel(browserServer,
					       javascriptServer,
                                               boot)))
