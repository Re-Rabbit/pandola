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
    process.nextTick(() => setWorkSpace(workspace)(done))
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

function css() {
    const cssPath = stylesBuildPath(workspace)
    
    const start = +new Date
    return gulp
	.src(cssPath, { base: pages })
	.pipe(sass(sassConfig()))
	.pipe(gulp.dest(tmp))
	.pipe(data(() => {
	    log.css(workspace, +new Date - start)
	}))
}

function nunjucksEnv() {
    return new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader([pages,
				       `${pages}/${workspace}`,
				       libs,
				       components])
    )
}

function html() {
    const htmlPath = htmlsBuildPath(workspace)
    const start = +new Date
    return gulp
	.src(htmlPath, { base: pages })
	.pipe(nunjucks
	      .compile({}, { env: nunjucksEnv() })
	      .on('error', console.log))
	.pipe(gulp.dest(tmp))
	.pipe(data(() => {
	    log.html(workspace, +new Date - start)
	}))
}

function reload(done) {
    browserSync.reload()
    done()
}

function javascriptServer(done) {
    const jsPath = scriptsBuildPath(workspace)
    
    return gulp
	.src(jsPath, { base: pages, allowEmpty: true })
	.pipe(named())
        .pipe(webpack(webpackConfig, null, (err, stats) => {
	    const res = stats.toJson()
	    log.js(workspace, res.time)
	})).on('error', console.log)
	.pipe(gulp.dest(tmp))
}

var historyApiFallback = require('connect-history-api-fallback')

function browserServer(done) {

    browserSync.init({
        port: 8888,
	//ui: false,
	//logLevel: 'silent',
	open: false,
	reloadOnRestart: true,
        startPath: `/${workspace}/`,
        server: {
            baseDir: tmp
        },
	middleware: [(req, res, next) => {
	    const test = req.url.match(/^\/(\w+)\/$/)
	    console.log(test, req.url)
	    if(test && test[1] != workspace) {
		setWorkSpace(test[1])(browserSync.reload)
	    }

	    // Disable cache because when browser history back which can't trigger setWorkSpace
	    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store')
	    
	    next()
	}],
    }, () => {
	
	log.browser(workspace, `http://localhost:8888/${workspace}/`)
    })

    browserSync.emitter.on('connent', () => {
	console.log('1111111')
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
