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
 */


const gulp = require('gulp')
const sass = require('gulp-sass')
const nunjucks = require('gulp-nunjucks')
const data = require('gulp-data')
const changed = require('gulp-changed');
const tool = require('gulp-util')
//const watch = require('gulp-watch')
const nunjucks_impl = require('nunjucks')
const named = require('vinyl-named')
const path = require('path')
const webpack = require('webpack-stream')
const del = require('del')
const reload = require('browser-sync').reload
const webpackConfig = require('./../webpack.config.js')

/**
 * Paths
 */

// src
const pages = 'pages'
const components = 'components'
const libs = 'libs'
// dest
const tmp = 'tmp'

const stylesInitBuildPath = () => `${pages}/**/index.scss`
const stylesReBuildPath = (workspace) => `${pages}/${workspace}/index.scss`
const stylesWatchPath = () => [pages, components, libs].map(n => `${n}/**/*.scss`)

function sassConfig() {
    return {
	outputStyle: 'expanded',
	indentType: 'space',
	importer: [(url, prev, done) => {
	    setImmediate(
		() => console.log(url, prev)
	    )
	    done({ file: url })
	}]
    }
}
function cssInitBuild() {
    return gulp
	.src(stylesInitBuildPath())
	.pipe(sass(sassConfig()))
	.pipe(gulp.dest(tmp))
}

cssInitBuild.displayName = 'css:init'

var workspace = 'zhihu'

function cssReBuild() {
    console.log(workspace)
    return gulp
	.src(stylesReBuildPath(workspace))
	.pipe(sass(sassConfig()))
	.pipe(gulp.dest(tmp))
}

cssReBuild.displayName = `css::${workspace}`

function watch(done) {
    gulp.watch(stylesWatchPath(), gulp.series(cssReBuild))
	.on('change', (path, stats) => {
	    if (stats)
		setImmediate(
		    () => tool.log(`${tool.colors.bgMagenta(' File ')} ${tool.colors.magenta(path)} changed size to ${stats.size}`)
		)
	});
    
    done()
}


gulp.task('default', gulp.series(cssInitBuild,
				 gulp.parallel(watch)))

