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
 */


const gulp = require('gulp')
const sass = require('gulp-sass')
const nunjucks = require('gulp-nunjucks')
const data = require('gulp-data')
const tool = require('gulp-util')
const nunjucks_impl = require('nunjucks')
const named = require('vinyl-named')
const webpack = require('webpack-stream')
const del = require('del')
const reload = require('browser-sync').reload
const webpackConfig = require('./../webpack.config.js')
const path = require('path')
const fs = require('fs')

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
var workspace = 'zhihu'
const workspaceTmp = '.workspace'
const workspaceTmpFile = `${tmp}/${workspaceTmp}`

const stylesBuildPath = (workspace) => `${pages}/${workspace}/index.scss`
const stylesWatchPath = () => [pages, components, libs].map(n => `${n}/**/[^#]*.scss`)

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
            console.log(tool.colors.bgMagenta(' Workspace '),
                     tool.colors.green(`${workspace}`),
                     '->',
                     tool.colors.yellow(`${value}`))
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
    console.log(tool.colors.bgBlue(' CSS '), cssPath, +new Date)
    return gulp
	      .src(cssPath)
	      .pipe(sass(sassConfig()))
	      .pipe(gulp.dest(tmp))
}

function watch(done) {

    gulp.watch(stylesWatchPath(), gulp.series(css))
	      .on('change', (path, stats) => {
	          if (stats)
		            setImmediate(
		                () => console.log(`${tool.colors.bgWhite(' File ')} ${tool.colors.magenta(path)} changed size to ${stats.size}`)
		            )
	      })


    gulp.watch(workspaceTmpFile, gulp.series(css))

    done()
}


gulp.task('default', gulp.series(clean,
				                         gulp.parallel(watch,
                                               boot)))
